var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get("/registro", usersController.createUser);
router.post("/registro", usersController.storeUser);
router.get('/login', usersController.login);
router.post('/misResenias', usersController.myReviews);
router.get('/misResenias/edit/:id', usersController.showEdit);
router.post('/misResenias/edit/:id', usersController.confirmEdit);
router.get('/misResenias/delete/:id', usersController.deleteReview);
router.post('/misResenias/delete/:id', usersController.confirmDelete);
router.get('/buscar', usersController.buscar);
router.get('/detalle/:id', usersController.detalle);

module.exports = router;
