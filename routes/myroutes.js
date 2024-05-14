const express = require('express');
const bodyParser = require("body-parser");
const Movie = require("../model/movie");

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

// GET all documents
router.get('/', async (req, res) => {
    res.send('Tervetuloa Movie-tietokantaan')
})

// Post Method
router.post('/post', urlencodedParser, async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });

    try {
        const savedMovie = await movie.save();
        res.send(savedMovie);
    } catch (err) {
        res.send(err)
    }
  });

//Get All Method
routes.get('/getALL', async (req, res) => {
  try {
    const movies = await Movie.find({}).limit(10);
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const movies = await Movie.find({}).limit(10);
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PATCH/PUT an existing document by ID
router.patch('/api/update/:id', getDocument, async (req, res) => {
  if (req.body.fieldToUpdate != null) {
    res.document.fieldToUpdate = req.body.fieldToUpdate;
  }
  // Update other fields as needed
  try {
    const updatedDocument = await res.document.save();
    res.json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a document by ID
router.delete('/api/delete/:id', getDocument, async (req, res) => {
  try {
    await res.document.remove();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getDocument(req, res, next) {
  let document;
  try {
    document = await mymodel.findById(req.params.id);
    if (document == null) {
      return res.status(404).json({ message: 'Document not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.document = document;
  next();
}

module.exports = router;
