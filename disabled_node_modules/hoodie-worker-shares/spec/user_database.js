require('./spec_helper.js');

var when = require("when");
var WorkerMock = require("./mocks/worker.js")
var UserDatabase = require("./../lib/user_database.js");

describe('UserDatabase', function () {
  beforeEach(function () {
    this.userDbWorker = new UserDatabase('user/hash', WorkerMock)
  });

  describe('constructor', function () {
    
  }); // constructor

  
}); // UserDatabase