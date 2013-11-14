function refreshChart(id, name) {
	document.getElementById(id).innerHTML = name;
}

// kudos: http://snipplr.com/view/26338/cascading-select-boxes/  - Creative Commons Attribution-Share Alike 3.0 Unported License
function cascadeSelect(parent, child){
	var childOptions = child.find('option:not(.static)');
		//console.log("sorting");
		//childOptions.sort(sortBylabelAlpha);
		child.data('options',childOptions);
		//console.log("childOptions: " + JSON.stringify(childOptions))
	parent.change(function(){
		childOptions.remove();
		console.log("changing");
		var filteredData = child.data('options').filter('.sub_' + this.value);
		var sortedFilteredData = filteredData.sort(sortBylabelAlpha);
		//console.log("sortedFilteredData: " + JSON.stringify(sortedFilteredData));
		child
			.append(sortedFilteredData)
			.change();
	});
	childOptions.not('.static, .sub_' + parent.val()).remove();
}

function sortBylabelAlpha(a,b) {
	//var result = a.label.toLowerCase() > b.label.toLowerCase();
	//console.log(a.label.toLowerCase() + ":" + b.label.toLowerCase() + "= " + result);
	var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
	if (nameA < nameB) //sort string ascending
		  return -1;
		 if (nameA > nameB)
		  return 1;
		 return 0; //default return value (no sorting)
	//return result;
}

function loadCascadedSelects(){
	var cascadeForm = $('#theForm');
	var subcounty = cascadeForm.find('#subcounty');
	var village = cascadeForm.find('#village');
	cascadeSelect(subcounty, village);
}

//window.onload = loadCascadedSelects;

function checkVersion() {
  console.log("Checking for new version of app.");
  $.ajax({ type: "GET", url: "https://dl.dropboxusercontent.com/s/nxvrvdtpvmqomxd/version.xml?token_hash=AAHFO2PaE2L6pTZQoDYYU1PVAKS6qMK6__PZgU3LYzUgGg&dl=1", dataType: "xml",
    success: function(xml) {
      console.log("xml: " + xml);
      $(xml).find('version').each(function(){
        var vcode = $(this).find('v_code').text(); //get the v_code in the xml file
        console.log("Remote version: " + vcode);
        window.plugins.version.getVersionCode(
            function(version_code) {
              console.log("Installed version: " + version_code);
              if(version_code != vcode){
                console.log("Upgrade app!");
                navigator.notification.beep(3);
                navigator.notification.vibrate(2000);
                navigator.notification.confirm(
                    'A new version is out! Get it now!',  // message
                    onVersion,            // callback to invoke with index of button pressed
                    'Update available',                 // title
                    ['Update now!', 'Maybe later']     // buttonLabels
                );
              }
            },
            function(errorMessage) {
              console.log("Error while downloading update: " + errorMessage);
            }
        );
      });
    }
  });
}

function onVersion(button) {
  if(button == 1){
    //window.open('https://dl.dropbox.com/s/o1kur0w2skwx7a3/Olutindo-debug.apk?dl=1','_blank');
    downloadFile()
  }
}

//kudos: http://stackoverflow.com/questions/11455323/how-to-download-apk-within-phonegap-app
//http://www.raymondcamden.com/index.cfm/2013/5/1/Using-the-Progress-event-in-PhoneGap-file-transfers
function downloadFile(){
  var fileSystem;
  console.log("downloading file.")

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
      function(fs) {
        fileSystem = fs;
        var ft = new FileTransfer();
        var uri = encodeURI("https://dl.dropbox.com/s/o1kur0w2skwx7a3/Olutindo-debug.apk?dl=1");
        var downloadPath = fileSystem.root.fullPath + "/Olutindo-debug.apk";
        navigator.notification.progressStart("Application Update", "Initiating download...");
        ft.onprogress = function(progressEvent) {
          if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            //statusDom.innerHTML = perc + "% loaded...";
            navigator.notification.progressValue(perc);
          }
        };
        ft.download(uri, downloadPath,
            function(theFile) {
              navigator.notification.progressStop();
              console.log("download complete: " + theFile.toURL());
              window.plugins.webintent.startActivity({
                    action: window.plugins.webintent.ACTION_VIEW,
                    url: 'file://' + theFile.fullPath,
                    type: 'application/vnd.android.package-archive'
                  },
                  function() {},
                  function() {
                    alert('Failed to open URL via Android Intent.');
                    console.log("Failed to open URL via Android Intent. URL: " + theFile.fullPath)
                  }
              );
            },
            function(error) {
              alert("download error: " + JSON.stringify(e));
              console.log("download error: " + JSON.stringify(e));
            });
      }, function(e) {
        alert('failed to get fs: ' + JSON.stringify(e));
        console.log("failed to get fs: " + JSON.stringify(e));
      });
}

function saveLoginPreferences(username, password, site, department) {
  console.log("Saving login prefs. username: " + username + " password: " + password + " site: "  + site + " department:" + department);
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    window.applicationPreferences.set("username", username, function() {
    }, function(error) {
      console.log("Error! " + JSON.stringify(error));
    });
    window.applicationPreferences.set("password", password, function() {
    }, function(error) {
      console.log("Error! " + JSON.stringify(error));
    });
    window.applicationPreferences.set("site", site, function() {
    }, function(error) {
      console.log("Error! " + JSON.stringify(error));
    });
    window.applicationPreferences.set("department", department, function() {
    }, function(error) {
      console.log("Error! " + JSON.stringify(error));
    });
    console.log("Successfully saved login preferences.");
    StartReplication();
    UrbanAirshipRegistration();
  } else {
    console.log("Login prefs *not* saved. They currently saved only on smartphone version.")
  }
}

function getLoginPreferences() {
  var account = new Object();
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    window.applicationPreferences.get("username", function(value) {
      account.username = value;
    }, function(error) {
      alert("Welcome to Olutindo! Please sign in so that the app can receive records from the server.");
      console.log("The username is not stored in preferences; displayed sign in notice. Error Message: " + JSON.stringify(error));
      //$form = $.modalForm({fields: [ 'username', 'password', 'site', 'department' ], submit: 'Sign in'})
      FORMY.router.navigate('config', true);
      return null;
    });
    window.applicationPreferences.get("password", function(value) {
      account.password = value;
    }, function(error) {
      //alert("Error! " + JSON.stringify(error));
      //console.log("Error! " + JSON.stringify(error));
    });
    window.applicationPreferences.get("site", function(value) {
      account.site = value;
    }, function(error) {
      //alert("Error! " + JSON.stringify(error));
      //console.log("Error! " + JSON.stringify(error));
    });
  } else {
    account.username = "testuser";
    account.password = "testuserPassword";
    account.site = "aru";
    //alert("Welcome to Olutindo! Please sign in so that the app can receive records from the server.");
    //FORMY.router.navigate('config', true);
  }
  return account;
}

var StartReplication = function (account) {
  if (account != null && account.username != null) {
    var credentials = account.username + ":" + account.password;
    var couchdb =  "troubletickets_" +  account.site;
    var subdomain =  "ug" +  account.site;

    var remoteCouch = "http://" + credentials + "@192.168.1.60:5984/" + couchdb + "/";
    // CORS reverse proxy for Cloudant
//    var remoteCouch = "http://localhost:3000/troubletickets/" + subdomain + "/" + credentials;
//    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
//      remoteCouch = "https://" + credentials + "@" + subdomain + ".cloudant.com/troubletickets/";
//    }

    console.log("start replication with " + remoteCouch)
    FORMY.ReplicationStarted = true;
    //var opts = {continuous: true, withCredentials:true, cookieAuth: {username:account.username, password:account.password}, auth: {username:account.username, password:account.password}};
    var opts = {continuous: true,
      withCredentials:true,
      //cookieAuth: {username:account.username, password:account.password},
      auth: {username:account.username, password:account.password},
      complete: onComplete,
      timeout: 60000};
    //var opts = {continuous: true, withCredentials:true};
    //var opts = {continuous: true};
    Backbone.sync.defaults.db.replicate.to(remoteCouch, opts, ReplicationErrorLog);
    //localDB.replicate.from('http://relax.com/on-the-couch', {withCredentials:true, cookieAuth: {username:'admin', password:'pass'}}, function(){});
    Backbone.sync.defaults.db.replicate.from(remoteCouch, opts, ReplicationErrorLog);
  }
}

var UrbanAirshipRegistration = function (account) {

  if (typeof window.plugins != 'undefined') {
    push = window.plugins.pushNotification;

    // Callback for when a device has registered with Urban Airship.
    push.registerEvent('registration', function (error, id) {
      if (error) {
        console.log('There was an error registering for push notifications');
      } else {
        console.log("Registered with ID: " + id);
      }
    });
    // Callback for when the app is running, and receives a push.
    push.registerEvent('push', function (push) {
      console.log("Got push: " + push.message)
    });

    if (account != null && account.username != null) {
      // Set an alias, this lets you tie a device to a user in your system
      push.setAlias(account.username, function () {
        push.getAlias(function (alias) {
          console.log("The user formerly known as " + alias)
        });
      });
    }
    // Check if push is enabled
    push.isPushEnabled(function (enabled) {
      if (enabled) {
        console.log("Push is enabled! Fire away!");
      }
    })
  }
}

var ReplicationErrorLog = function(err, result) {
  if (result !=null && result.ok) {
    console.log("Replication is fine. ")
  } else {
    console.log("Replication error: " + JSON.stringify(err));
    if ((typeof err != 'undefined') && (err.status === 401)) {
      alert("Error: Name or password is incorrect. Unable to connect to the server.");
    }
  }
}


var onComplete = function(err, result) {
  if (result.ok) {
    console.log("onComplete: Replication is fine. ")
  } else {
    console.log("onComplete: Replication error: " + JSON.stringify(err));
  }
}

var signIn = function() {
  //$form = $.modalForm({fields: [ 'username', 'password', 'site', 'department' ], submit: 'Sign in'})
  $.modalForm({fields: [ 'username', 'password', 'site', 'department' ], submit: 'Sign in'})
  //$form.on('submit', handleSignInSubmit( 'signin' ))
  //$form.on('submit', handleSignInSubmit());
}

var handleSignInSubmit = function() {
  console.log("Is this thing working?")

  saveLoginPreferences($("#username").val(), $("#password").val(), $("#site-dropwdown").val(), $("#department-dropwdown").val());
  $("#SigninForm").hide();
//  return function(event, inputs) {
//    console.log("Submitting signin form.")
//    var $modal = $(event.target)
//    saveLoginPreferences(inputs.username, inputs.password, inputs.site, inputs.department);
//    $modal.modal('hide')
//  }
}

// uuid
// ------

// This is borrowed from Hood.ie

// helper to generate unique ids.
var uuidGenerator = function(len) {
  var chars, i, radix;

  // default uuid length to 7
  if (len === undefined) {
    len = 7;
  }

  // uuids consist of numbers and lowercase letters only.
  // We stick to lowercase letters to prevent confusion
  // and to prevent issues with CouchDB, e.g. database
  // names do wonly allow for lowercase letters.
  chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  radix = chars.length;

  // eehmm, yeah.
  return ((function() {
    var _i, _results = [];

    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      var rand = Math.random() * radix;
      var char = chars[Math.floor(rand)];
      _results.push(chars[0] = String(char).charAt(0));
    }

    return _results;
  })()).join('');
};




