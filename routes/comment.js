const express = require('express');
const router = express.Router();
const CommentController = require('../controller/comment');

router.post('/add',CommentController.addComment)

module.exports = router;

