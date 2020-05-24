var express = require('express');
var router = express.Router();
var seriesController = require('../controllers/seriesController');

router.get('/home', seriesController.home);
router.get('/genero', seriesController.seriesxgenero);
router.get('/infoxserie', seriesController.infoxserie);
router.post('/infoxserie',seriesController.storeResenia);
router.get('/favoritas', seriesController.favoritas);
router.get('/resultado', seriesController.resultado);
router.get('/resultadoAvanzado', seriesController.resultadoAvanzado);



module.exports = router;
