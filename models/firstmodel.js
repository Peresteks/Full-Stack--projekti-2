const mongoose = require('mongoose');

const firstschema = new mongoose.Schema({
  // Define your schema fields here
});

const firstmodel = mongoose.model('firstmodel', firstschema);

module.exports = firstmodel;
