let db = require('../database/models');
let sequelize = db.sequelize;

let seriesController = {
    home: function(req, res){
        res.render('home')
    },
    seriesxgenero: function(req, res){
        res.render('seriesxgenero')
    },
    infoxserie: function(req, res){
        res.render('infoxserie')
    },
    favoritas: function(req, res){
        res.render('favoritas')
    },
    resultado: function(req, res){
        res.render('resultado')
    },
    resultadoAvanzado: function(req, res){
        res.render('resultadoavanzado')
    },

}
 
module.exports = seriesController;