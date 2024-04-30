const express = require('express');
const router = express.Router();
const firstmodel = require('../models/firstmodel');

// GET all documents
router.get('/api/getall', async (req, res) => {
  try {
    const documents = await firstmodel.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one document by ID
router.get('/api/:id', getDocument, (req, res) => {
  res.json(res.document);
});

// POST a new document
router.post('/api/add', async (req, res) => {
  const document = new firstmodel(req.body);
  try {
    const newDocument = await document.save();
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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
    document = await firstmodel.findById(req.params.id);
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
