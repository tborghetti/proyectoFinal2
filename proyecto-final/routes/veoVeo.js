var express = require('express');
var router = express.Router();
var seriesController = require('../controllers/seriesController');

router.get('/home', seriesController.home);
router.get('/genero/:idGenero', seriesController.seriesxgenero);
router.get('/infoxserie/:id', seriesController.infoxserie);
router.get('/favoritas', seriesController.favoritas);
router.get('/resultado/:loBuscado', seriesController.resultado);
router.get('/resultadoAvanzado/:filtro', seriesController.resultadoAvanzado);


module.exports = router;
