var request = require('request')

module.exports = function(pattern, host){
  return function(req, res, next){
    if(req.url.match(pattern)){
      var db_path = req.url.match(pattern)[1]
      var parts = db_path.split("/");
      var subdomain = parts[0]
      var credentials = parts[1];
      var query = parts[2];
      var db_url = "https://" + credentials + "@" + subdomain + "." + host + "/" + query
       // [host, db_path].join('/');
      console.log("pattern: " + pattern + " credentials: " + credentials + " db_url: " + db_url)
      req.pipe(request[req.method.toLowerCase()](db_url)).pipe(res);
    }else{
      next();
    }
  }
}