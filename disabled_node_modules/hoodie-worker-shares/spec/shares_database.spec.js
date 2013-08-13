require('./spec_helper.js');

var when = require("when");
var WorkerMock = require("./mocks/worker.js")
var SharesDatabase = require("./../lib/shares_database.js");

describe('SharesDatabase', function () {
  beforeEach(function () {
    this.sharesDbWorker = new SharesDatabase('user/hash/shares', WorkerMock)
  });
  
  describe('constructor', function () {
    
  }); // constructor
}); // SharesDatabase