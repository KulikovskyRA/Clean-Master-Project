const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix); // Rename the file
  },
});

const upload = multer({ storage: storage });

const cleanerRouter = express.Router();

const {
  cleanerLogin,
  cleanerRegister,
  cleanersList,
  cleanerInfo,
  cleanerPhoto

} = require('../controllers/cleaner.controller');

module.exports = cleanerRouter
  .post('/login', cleanerLogin)
  .post('/register', cleanerRegister)

  .get('/', cleanersList)
  .get('/info', cleanerInfo)

  .post('/updatePhoto/:id', upload.single('image'), cleanerPhoto)


