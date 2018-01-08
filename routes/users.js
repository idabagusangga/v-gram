var express = require('express');
var router = express.Router();
const UserController = require('../controller/user');

/* GET users listing. */
router.get('/', UserController.getUser)
router.post('/',UserController.createUser)
router.post('/login',UserController.login)
router.post('/addfollowers',UserController.addFollowers)
router.post('/findUser',UserController.getUserById)

module.exports = router;
