var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get("/registro", usersController.createUser);
router.post("/registro", usersController.storeUser);
router.get('/login', usersController.login);
router.post('/misResenias', usersController.myReviews);


module.exports = router;
