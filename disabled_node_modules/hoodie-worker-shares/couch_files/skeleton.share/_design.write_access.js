var validate_doc_update = function(newDocument, oldDocument, userContext, securityObject) {
  if (!securityObject.writers || securityObject.writers.roles.length === 0)
    return;

  if (userContext.roles.indexOf('_admin') !== -1)
    return;

  for (var i = 0; i < securityObject.writers.roles.length; i++) {
    log('securityObject.writers.roles[' + i + ']: ' + securityObject.writers.roles[i]);
    for (var j = 0; j < userContext.roles.length; j++) {
      log('userContext.roles['+j+']: ' + userContext.roles[j]);
      if (securityObject.writers.roles[i] === userContext.roles[j])
        return;
    }
  }
  
  throw({forbidden: 'you are not allowed edit objects in ' + userContext.db});
};
var json = {
  "_id": "_design/write_access",
  "views": {},
  "validate_doc_update": validate_doc_update.toString().replace(/\s*\n\s*/g, ' ')
}
module.exports = json
