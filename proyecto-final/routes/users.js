var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get("/registro", usersController.createUser);
router.post("/registro", usersController.storeUser);
router.get('/login', usersController.login);
router.post('/misResenias', usersController.myReviews);
router.get('/misResenias/edit/:id', usersController.showEdit);
router.post('/misResenias/edit/:id', usersController.confirmEdit);

module.exports = router;
