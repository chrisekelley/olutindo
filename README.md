# Olutindo

Olutindo is a webapp for managing citizen complaints in Uganda. It is a companion to the
[Olutindo-app](https://github.com/chrisekelley/olutindo-app) Android application.
[Coconut](http://chrisekelley.github.io/coconut/) for most of its front-end form rendering, [backbone.js](http://backbonejs.org) for MVC,
[pouchdb](http://pouchdb.com/) for browser-based data store and replication, and [CouchDB](http://couchdb.apache.org/) for the master data store.

It is the html5 part of [Olutindo-app](https://github.com/chrisekelley/olutindo-app)

## Config

Set your local database name in config.js.

Set your master couch server in the StartReplication function in coconut-utils.js.

        var remoteCouch = "http://" + credentials + "@127.0.0.1:5984/" + couchdb + "/";

The credentials are set when the user logs in.

## Get running

    npm install
    npm start

Open your browser to http://localhost:8000.



