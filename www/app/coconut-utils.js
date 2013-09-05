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

function findSyncpointLocalDb() {
	var id = null;
	var local_db_name = null;
	
	$.getJSON('/sp_admin/_design/control/_view/by_type?key=%22installation%22', function(data) { 
		var record = null;
		$.each(data, function(key, val) {
			if (key == "rows") {
				record = val;
				id = record[0].id;
			}
		});
		if (record != null) {
			//console.log("record: " + JSON.stringify(record));
			console.log("id: " + id);
			$.getJSON('/sp_admin/' + id, function(data) {
				//console.log("data: " + JSON.stringify(data));
				local_db_name = data.local_db_name;
				FORMY.SyncpointLocalDb = local_db_name;
				console.log("local_db_name: " + FORMY.SyncpointLocalDb);
			});
		}
	});
}

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
                navigator.notification.confirm(
                    'A new version is out! Get it now!',  // message
                    onVersion,            // callback to invoke with index of button pressed
                    'Update available',                 // title
                    'Update now!, Maybe later'     // buttonLabels
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

  window.requestFileSystem(LocalFileSystem.TEMPORARY, 0,
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
                    //url: 'file://' + theFile.fullPath,
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

function saveLoginPreferences(username, password) {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    window.applicationPreferences.set("username", username, function() {
    }, function(error) {
      console.log("Error! " + JSON.stringify(error));
    });
    window.applicationPreferences.set("password", password, function() {
    }, function(error) {
      console.log("Error! " + JSON.stringify(error));
    });
    console.log("Successfully saved login preferences.");
    StartReplication();
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
      console.log("Error! " + JSON.stringify(error));
    });
    window.applicationPreferences.get("password", function(value) {
      account.password = value;
    }, function(error) {
      //alert("Error! " + JSON.stringify(error));
      //console.log("Error! " + JSON.stringify(error));
    });
  } else {
    account.username = "testuser";
    account.password = "testuserPassword";
  }
  return account;
}

var StartReplication = function () {
  var account = getLoginPreferences();
  if (account.username != null) {
    var credentials = account.username + ":" + account.password;
    //var remoteCouch = "https://testuser:testuserPassword@olutindo.iriscouch.com/troubletickets/";
    var remoteCouch = "https://" + credentials + "@olutindo.iriscouch.com/troubletickets/";
    console.log("start replication with " + remoteCouch)
    FORMY.ReplicationStarted = true;
    var opts = {continuous: true, withCredentials:true, cookieAuth: {username:account.username, password:account.password}, auth: {username:account.username, password:account.password}};
    //var opts = {continuous: true, withCredentials:true};
    //var opts = {continuous: true};
    Backbone.sync.defaults.db.replicate.to(remoteCouch, opts, ErrorLog);
    //localDB.replicate.from('http://relax.com/on-the-couch', {withCredentials:true, cookieAuth: {username:'admin', password:'pass'}}, function(){});
    Backbone.sync.defaults.db.replicate.from(remoteCouch, opts, ErrorLog);
  }
}

var ErrorLog = function(err, res) {
  console.log("err: " + JSON.stringify(err));
  if ((typeof err != 'undefined') && (err.status === 401)) {
    alert("Error: Name or password is incorrect. Unable to connect to the server.");
  }
}




