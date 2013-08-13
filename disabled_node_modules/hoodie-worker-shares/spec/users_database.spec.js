require('./spec_helper.js');

var when       = require("when");
var WorkerMock = require("./mocks/worker.js");

var UserDbWorkerMock   = require('./mocks/user_database');
var UserDbWorkerSpy    = spyOnModule('./../lib/user_database.js').andReturn(UserDbWorkerMock);

var UsersDatabase = require("./../lib/users_database.js");

describe('UsersDatabase', function () {
  beforeEach(function () {
    spyOn(UsersDatabase.prototype, "listenUp");
    this.usersDatabase = new UsersDatabase(WorkerMock);
  });
  
  describe('constructor', function () {
    it('should prepare userDatabases hash', function () {
      expect(this.usersDatabase.userDatabases).toEqual({});
    });
    it("should #listenUp()", function() {
      expect(this.usersDatabase.listenUp).wasCalled();
    });
  }); // constructor

  describe('#listenUp()', function () {
    beforeEach(function() {
      spyOn(this.usersDatabase, "handleChange");
      spyOn(this.usersDatabase, "handleChangeError");
      spyOn(this.usersDatabase, "handleRemovedUserAccount");
      spyOn(this.usersDatabase, "handleCreatedUserAccount");
      this.usersDatabase.listenUp.andCallThrough();
      this.usersDatabase.listenUp();
    });
    it('should listen to changes in _users database', function () {
      expect(this.usersDatabase.couch.database).wasCalledWith('_users');
      expect(this.usersDatabase.couch.database().changes).wasCalledWith({ include_docs: true });
    });
    it("should listen to changes in _users changes feed", function() {
      var changesApi = this.usersDatabase.couch.database().changes();
      var args = changesApi.on.calls[0].args;
      expect(args[0]).toBe('change');
      args[1]('change');
      expect(this.usersDatabase.handleChange).wasCalledWith('change');
    });
    it("should listen to errors in _users changes feed", function() {
      var changesApi = this.usersDatabase.couch.database().changes()
      var args = changesApi.on.calls[1].args
      expect(args[0]).toBe('error')
      args[1]('error')
      expect(this.usersDatabase.handleChangeError).wasCalledWith('error');
    });

    it("should listen to account:removed event", function() {
      var args = this.usersDatabase.worker.on.calls[0].args
      expect(args[0]).toBe('account:removed')
      args[1]('dbName')
      expect(this.usersDatabase.handleRemovedUserAccount).wasCalledWith('dbName');
    });
    it("should listen to account:added event", function() {
      var args = this.usersDatabase.worker.on.calls[1].args
      expect(args[0]).toBe('account:added')
      args[1]('dbName')
      expect(this.usersDatabase.handleCreatedUserAccount).wasCalledWith('dbName');
    });
  }); // #listenUp()


  describe('#handleChangeError(error)', function () {
    beforeEach(function() {
      this.usersDatabase.handleChangeError('ooops')
    });
    it('call #handleError with a message', function () {
      expect(this.usersDatabase.worker.handleError).wasCalledWith('ooops', 'error in _users/_changes feed');
    });
  }); // #handleChangeError(error)


  describe('#handleChange( change )', function () {
    beforeEach(function() {
    });

    _when('change.doc has no database property', function () {
      beforeEach(function() {
        this.change = {
          doc : {
            $state: 'confirmed'
          }
        }
        this.usersDatabase.handleChange( this.change )
      });
      it("should not emit anything", function() {
        expect(this.usersDatabase.worker.emit).wasNotCalled();
      });
    })

    _when('change.doc is not confirmed', function () {
      beforeEach(function() {
        this.change = {
          doc : {
            database: 'user/hash'
          }
        }
        this.usersDatabase.handleChange( this.change )
      });
      it("should not emit anything", function() {
        expect(this.usersDatabase.worker.emit).wasNotCalled();
      });
    })

    _when('change.deleted is true but user database has not yet been intialized', function () {
      beforeEach(function() {
        this.change = {
          deleted : true,
          doc : {
            database: 'user/hash'
          }
        }
        spyOn(this.usersDatabase, "userDbInitialized").andReturn( false );
        this.usersDatabase.handleChange( this.change )
      });
      it("should not emit anything", function() {
        expect(this.usersDatabase.worker.emit).wasNotCalled();
      });
    })

    _when('change.doc is confirmed and has a database property', function () {
      beforeEach(function() {
        this.change = {
          doc : {
            database: 'user/hash',
            $state: 'confirmed'
          }
        }
      });

      _and('change.deleted is true and user db has been initialized', function () {
        beforeEach(function() {
          this.change.deleted = true
          spyOn(this.usersDatabase, "userDbInitialized").andReturn( true );
          this.usersDatabase.handleChange( this.change )
        });
        it("should not emit account:removed event", function() {
          expect(this.usersDatabase.worker.emit).wasCalledWith('account:removed', 'user/hash');
        });
      })

      _and('user database has not yet been intialized has not been intialized yet', function () {
        beforeEach(function() {
          spyOn(this.usersDatabase, "userDbInitialized").andReturn( false );
          this.usersDatabase.handleChange( this.change )
        });
        it("should not emit account:added event", function() {
          expect(this.usersDatabase.worker.emit).wasCalledWith('account:added', 'user/hash');
        });
      })

      _and('user database has not yet been intialized has been intialized before', function () {
        beforeEach(function() {
          spyOn(this.usersDatabase, "userDbInitialized").andReturn( true );
          this.usersDatabase.handleChange( this.change )
        });
        it("should not emit account:updated event", function() {
          expect(this.usersDatabase.worker.emit).wasCalledWith('account:updated', 'user/hash');
        });
      })
    })
  }); // #handleChange( change )


  describe('#userDbInitialized( dbName )', function () {
    beforeEach(function() {
      this.usersDatabase.userDatabases = {
        'user/hash' : true
      }
    });
    _when('userDbWorker has been initialized', function () {
      it('it should return true', function () {
        expect(this.usersDatabase.userDbInitialized('user/hash')).toBe( true );
      });
    });
    _when('userDbWorker has not been initialized', function () {
      it('it should return false', function () {
        expect(this.usersDatabase.userDbInitialized('user/unknown')).toBe( false );
      });
    });
  }); // #userDbInitialized( dbName )


  describe('#handleCreatedUserAccount( dbName )', function () {
    beforeEach(function() {
      this.usersDatabase.userDatabases = {}
    });
    it('should initialize a new UserDbWorker', function () {
      this.usersDatabase.handleCreatedUserAccount( 'user/hash' )
      expect(UserDbWorkerSpy).wasCalledWith( 'user/hash', this.usersDatabase );
      expect(this.usersDatabase.userDatabases['user/hash']).toEqual( UserDbWorkerMock );
    });
  }); // #handleCreatedUserAccount( dbName )


  describe('#handleRemovedUserAccount( dbName )', function () {
    beforeEach(function() {
      this.usersDatabase.userDatabases = {
        'user/hash' : 'userDbWorker'
      }
    });
    it('remove userDbWorker from userDatabases hash', function () {
      this.usersDatabase.handleRemovedUserAccount( 'user/hash' )
      expect(this.usersDatabase.userDatabases['user/hash']).toBeUndefined();
    });
  }); // #handleRemovedUserAccount( dbName )
}); // UsersDatabase