/*! backbone-pouch - v1.1.0 - 2013-07-16
* http://jo.github.io/backbone-pouch/
* Copyright (c) 2013 Johannes J. Schmidt; Licensed MIT */
(function(root) {
  'use strict';
  
  var BackbonePouch;
  if (typeof exports === 'object') {
    BackbonePouch = exports;
  } else {
    BackbonePouch = root.BackbonePouch = {};
  }

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require === 'function')) {
    _ = require('underscore');
  }

  var methodMap = {
    'create': 'post',
    'update': 'put',
    'patch':  'put',
    'delete': 'remove'
  };

  BackbonePouch.defaults = {
    fetch: 'allDocs',
    listen: true,
    options: {
      post: {},
      put: {},
      get: {},
      remove: {},
      allDocs: {
        include_docs: true
      },
      query: {
        include_docs: true
      },
      spatial: {
        include_docs: true
      },
      changes: {
        continuous: true,
        include_docs: true
      }
    }
  };

  function applyDefaults(options, defaults) {
    options.options = options.options || {};
    defaults.options = defaults.options || {};

    // merge toplevel options
    if (typeof options.fetch === 'undefined') {
      options.fetch = defaults.fetch;
    }
    if (typeof options.listen === 'undefined') {
      options.listen = defaults.listen;
    }
    if (typeof options.db === 'undefined') {
      options.db = defaults.db;
    }

    // merge PouchDB options
    _.each(defaults.options, function(value, key) {
      options.options[key] = options.options[key] || {};
      _.extend(options.options[key], value);
    });
  }

  // backbone-pouch sync adapter
  BackbonePouch.sync = function(defaults) {
    defaults = defaults || {};
    applyDefaults(defaults, BackbonePouch.defaults);

    var adapter = function(method, model, options) {
      options = options || {};
      applyDefaults(options, model && model.pouch || {});
      applyDefaults(options, defaults);

      // This is to get the options (especially options.db)
      // by calling model.sync() without arguments.
      if (typeof method !== 'string') {
        return options;
      }

      // ensure we have a pouch db adapter
      if (!options.db) {
        throw new Error('A "db" property must be specified');
      }

      function callback(err, response) {
        if (err) {
          return options.error && options.error(err);
        }
        if (method === 'create' || method === 'update' || method === 'patch') {
          response = {
            _id: response.id,
            _rev: response.rev
          };
        }
        if (method === 'delete') {
          response = {};
        }
        if (method === 'read') {
          if (response.rows) {
            response = _.map(response.rows, function(row) {
              // use `doc` value if present
              return row.doc ||
                // or use `value` property otherwise
                // and inject id
                _.extend({
                  _id: row.id
                }, row.value);
            });
          }
          if (options.listen) {
            // TODO:
            // * implement for model
            // * allow overwriding of since.
            options.db.info(function(err, info) {
              // get changes since info.update_seq
              options.db.changes(_.extend({}, options.options.changes, {
                since: info.update_seq,
                onChange: function(change) {
                  var todo = model.get(change.id);

                  if (change.deleted) {
                    if (todo) {
                      todo.destroy();
                    }
                  } else {
                    if (todo) {
                      todo.set(change.doc);
                    } else {
                      model.add(change.doc);
                    }
                  }

                  // call original onChange if present
                  if (typeof options.options.changes.onChange === 'function') {
                    options.options.changes.onChange(change);
                  }
                }
              }));
            });
          }
        }
        return options.success && options.success(response);
      }

      model.trigger('request', model, options.db, options);

      if (method === 'read') {
        // get single model
        if (model.id) {
          return options.db.get(model.id, options.options.get, callback);
        }
        // query view or spatial index
        if (options.fetch === 'query' || options.fetch === 'spatial') {
          if (!options.options[options.fetch].fun) {
            throw new Error('A "' + options.fetch + '.fun" object must be specified');
          }
          return options.db[options.fetch](options.options[options.fetch].fun, options.options[options.fetch], callback);
        }
        // allDocs or spatial query
        options.db[options.fetch](options.options[options.fetch], callback);
      } else {
        options.db[methodMap[method]](model.toJSON(), options.options[methodMap[method]], callback);
      }

      return options;
    };

    adapter.defaults = defaults;

    return adapter;
  };

  BackbonePouch.attachments = function(defaults) {
    defaults = defaults || {};

    function attachmentId(id, name) {
      return encodeURIComponent(id) + '/' + encodeURIComponent(name);
    }

    function getPouch(model) {
      if (model.pouch && model.pouch.db) {
        return model.pouch.db;
      }
      if (model.collection && model.collection.pouch && model.collection.pouch.db) {
        return model.collection.pouch.db;
      }
      
      if (defaults.db) {
        return defaults.db;
      }
      
      var options = model.sync();
      if (options.db) {
        return options.db;
      }

      // TODO: ask sync adapter
        
      throw new Error('A "db" property must be specified');
    }

    return {
      attachments: function(filter) {
        var atts = this.get('_attachments') || {};
        if (filter) {
          return _.filter(_.keys(atts), function(key) {
            if (typeof filter === 'function') {
              return filter(key, atts[key]);
            }
            
            return atts[key].content_type.match(filter);
          });
        }
        return _.keys(atts);
      },
      attachment: function(name, done) {
        // TODO: first look at the _attachments stub,
        // maybe there the data is already there
        var db = getPouch(this);
        return db.getAttachment(attachmentId(this.id, name), done);
      },
      attach: function(blob, name, type, done) {
        if (typeof name === 'function') {
          done = name;
          name = undefined;
          type = undefined;
        }
        if (typeof type === 'function') {
          done = type;
          type = undefined;
        }
        name = name || blob.filename;
        type = type || blob.type;

        // If I do not already have an id, give me one
        if (!this.id) {
          this.set({ _id: Math.uuid() }, { silent: true });
        }
        
        var db = getPouch(this);
        var that = this;
        return db.putAttachment(attachmentId(this.id, name), this.get('_rev'), blob, type, function(err, response) {
          if (!err && response.rev) {
            var atts = that.get('_attachments') || {};
            atts[name] = {
              content_type: type,
              stub: true
            };
            that.set({ _rev: response.rev, _attachments: atts }, { silent: true });
          }
          done(err, response);
        });
      }
    };
  };
}(this));
