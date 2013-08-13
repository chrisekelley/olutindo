// 1. ignore unshared objects
// 2. replicate only objects belonging to share
var share = function(doc, req) { 
  if (doc.$unshared) {
    return false;
  }
  if (doc.$sharedAt === req.query.shareId) {
    return true;
  }
};

var json = {
  "_id": "_design/filters",
  "views": {},
  "filters": {
    "share": share.toString().replace(/\s*\n\s*/g, ' ')
  }
}

module.exports = json