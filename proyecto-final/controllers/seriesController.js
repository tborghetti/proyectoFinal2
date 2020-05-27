let db = require('../database/models/index');
let sequelize = db.sequelize;
function validarContrasenia (contrasenia){
    let errores = [ ];
    if (seriesController.storeResenia.email == null){
        errores.push("Tenes que poner un mail")
    }
}

let seriesController = {
    home: function(req, res){
        res.render('home')
    },
    seriesxgenero: function(req, res){
        res.render('seriesxgenero')
    },
    infoxserie: function(req, res){
        let id_serie = req.query.id
        console.log(id_serie)
        res.render('infoxserie',{
            id_serie:id_serie
        })  
    },
    storeResenia: function(req,res){
        let review = {
            email: req.body.email,
            // password:req.body.password,
             text:req.body.comment,
             rating: req.body.rating,
             id_serie: req.body.id_serie
         }
         console.log(req.body)
         db.Review.create(review)
        .then(()=> {
            
            res.render('infoxserie',{
                review:review
            })
        })
//         let errores = validarContrasenia(resenia)
//         if(errores.length > 0){
//            db.User.email.findAll()
//            .then((email) =>{
//                res.render ("crearResenia", {
//                email: email,
//                errores: errores
//                })
//            })
//         } else {
//             res.render('home')
//         }
     },
//     create: function (req,res){
//         db.User.email.findAll()
 //        .then((email) =>{
//             res.render ("crearResenia", {
//             email: email,
//             })
//         })
//     },
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