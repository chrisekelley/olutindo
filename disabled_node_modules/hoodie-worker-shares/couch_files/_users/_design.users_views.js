var ownerByUsernameMap = function(doc) { 
  var username; 
  if (doc.ownerHash) { 
    username = doc.name.replace(/^user(_anonymous)?\//, ''); 
    emit(username, doc.ownerHash); 
  }
};
var json = {
  "_id": "_design/views",
  "views": {
    "ownerByUsername": {
      "map": ownerByUsernameMap.toString().replace(/\s*\n\s*/g, ' ')
    }
  }
}

module.exports = json