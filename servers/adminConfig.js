const db = require('./firebaseConfig');

const Admin = db.collection('Admin');

module.exports = Admin;