const db = require('./firebaseConfig');

const Events = db.collection('Events');

module.exports = Events;