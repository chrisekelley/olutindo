var helpers = {};


// 
// merge object2 into object1 using passed filter
// 
helpers.mergeProperties = function(object1, object2, filter) {

  var attributes = ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'],
      attribute

  if ( filter === false ) {
    return object1
  }

  if ( filter === true ) {
    attributes = Object.keys(object2)
  } else {
    attributes = attributes.concat(filter)
  }

  for (var i = 0; i < attributes.length; i++) {
    attribute = attributes[i]
    if (attribute !== '_id' && attribute !== '_rev') {
      object1[attribute] = object2[attribute]
    }
  }

  return object1 
}


// 
// 
// 
// var _timezoneOffset = null
helpers.generateNewRevisionId = function() {
  // var timestamp, uuid;

  // if (! _timezoneOffset)
  //   _timezoneOffset = new Date().getTimezoneOffset() * 60;

  // timestamp = Date.now() + _timezoneOffset;
  // uuid = this.worker.uuid();

  // return "" + uuid + "#" + timestamp;

  return helpers.uuid(10);
};


// 
// 
// 
helpers.uuid = function(len) {
  var chars, i, radix;
  chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  radix = chars.length;
  return ((function() {
    var _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      _results.push(chars[0 | Math.random() * radix]);
    }
    return _results;
  })()).join('');
};


module.exports = helpers;