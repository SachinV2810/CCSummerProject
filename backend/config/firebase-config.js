const admin = require("firebase-admin");

const serviceAccount = require("./adminkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports=admin;