var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get("/registro", usersController.createUser);


module.exports = router;
