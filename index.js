require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var url = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;


// Yhdistetään MongoDB-tietokantaan
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Yhteys tietokantaan muodostettu');
    
    })
    .catch((err) => {
        console.error('Virhe yhdistettäessä tietokantaan: $(err.stack)');
    });


app.listen(PORT, function () {
    console.log("Kuunnellaan porttia...: " + PORT);
});
