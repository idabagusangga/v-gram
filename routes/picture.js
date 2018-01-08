const express = require('express');
const router = express.Router();
const PictureController = require('../controller/picture');
const Image = require('../helpers/multerToBucket');

// how to set the get using token?
router.post('/browse',PictureController.getAllPicturesExclUser)
router.post('/add',Image.multer.single('image'),Image.sendUploadToGCS,PictureController.createPicture)
router.post('/',PictureController.getPictures)
router.delete('/:id',PictureController.removePicture)
router.post('/addpp',Image.multer.single('image'),Image.sendUploadToGCS,PictureController.addProfilePic)

module.exports = router;