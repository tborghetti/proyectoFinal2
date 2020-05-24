let db = require('../database/models/index');
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
    storeResenia: function(req,res){
        let resenia = {
            email:,
            password:,
            text:,
            rating:
        }
        db.User.create(resenia)
        .then(()=> {
            res.send("Reseñia creado")
        })
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