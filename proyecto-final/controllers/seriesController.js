let db = require('../database/models/index');
let sequelize = db.sequelize;
const moduloLogin = require('../modulo-login');


let seriesController = {
    home: function (req, res) {
        res.render('home')
    },
    seriesxgenero: function (req, res) {
        res.render('seriesxgenero')
    },
    infoxserie: function (req, res) {
        let id_serie = req.query.id
        db.Review.findAll({
            where: [{
                id_serie: req.query.id,
            }],
            include: [{ association: "Review_User" }]
        })
            .then((reviews) => {
                console.log(reviews)
                res.render('infoxserie', {
                    id_serie: id_serie,
                    reviews: reviews,
                })
            })

    },
    storeResenia: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
            .then((usuario) => {
                if (usuario != null) {
                    db.User.findAll({
                        where: {
                            email: req.body.email 
                        }
                    }).then(resultados => {
                        if (resultados.length > 0) {
                            let review = {
                                email: req.body.email,
                                password: req.body.password,
                                text: req.body.comment,
                                rating: req.body.rating,
                                id_serie: req.body.id_serie,
                                id_user: resultados[0].id,
                            }
                            db.Review.create(review)
                                .then(() => {

                                    res.redirect('/veoVeo/infoxserie?id=' + req.body.id_serie)
                                })
                        } 
                    })
                    
                } else {
                    res.redirect('/users/registro')
                }
            })

    },
    favoritas: function (req, res) {
        res.render('favoritas')
    },
    resultado: function (req, res) {
        res.render('resultado')
    },
    resultadoAvanzado: function (req, res) {
        res.render('resultadoavanzado')
    },

}

module.exports = seriesController;