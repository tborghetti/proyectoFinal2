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
        console.log(id_serie)
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
                    error: req.query.Error
                })
            })

    },
    storeResenia: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
            .then((usuario) => {
                let errores = []

                if (usuario == null) {
                    errores.push("Usuario invalido!")
                    db.Review.findAll({
                        where: [{
                            id_serie: req.query.id,
                        }],
                        include: [{ association: "Review_User" }]
                    })
                        .then((reviews) => {
                            console.log(reviews)
                            res.render('infoxserie', {
                                id_serie: req.query.id,
                                reviews: reviews,
                                errores: errores
                            })
                        })

                }

                if (errores.length == 0) {

                    db.User.findAll({
                        where: {
                            email: req.body.email //esto hay que sacarlo?
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
    create: function (req, res) {
        db.User.findAll()
            .then((email) => {
                res.render("crearResenia", {
                    email: email,
                })
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