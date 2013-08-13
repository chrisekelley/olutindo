var fs = require("fs");
var Worker = require("./lib/worker.js");

var package_json = JSON.parse(fs.readFileSync("./package.json"));
// turn 'hoodie-worker-whatever' in 'whatever'
var workerName   = package_json.name.substr(14);

var config = {
  name: workerName,
  server: process.env["HOODIE_SERVER"],
  admin: {
    user: process.env["HOODIE_ADMIN_USER"],
    pass: process.env["HOODIE_ADMIN_PASS"]
  },
  persistent_since_storage: false
};
new Worker(config);
