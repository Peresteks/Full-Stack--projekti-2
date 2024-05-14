const mongoose = require('mongoose');

const firstschema = new mongoose.Schema({
  // Määritellään kentät ja niiden tyypit
});

const firstmodel = mongoose.model('firstmodel', firstschema);

module.exports = firstmodel;
