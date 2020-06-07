let db = require('../database/models/index');
let operadores = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const moduloLogin = require('../modulo-login')

let usersController = {
    createUser: function (req, res) {
        res.render("registro")
    },
    storeUser: function (req, res) {
        let user = {
            name: req.body.name,
            email: req.body.email,
            birthday: req.body.birthday,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        db.User.findOne({
            where: [{ email: user.email }]
        }).then((emailIngresado) => {
            let elmailestamal = []
            if (emailIngresado != null) {
                res.render('registro', {
                    elmailestamal: elmailestamal
                })
            } else {
                db.User.create(user)
                    .then(() => {
                        res.redirect('./login')
                    })
            }
        })
    },
    login: function (req, res) {
        res.render('login')
    },
    myReviews: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
            .then((usuario) => {
                let errores = []
                if (usuario == null) {
                    res.render('login', {
                        errores: errores
                    })
                }
                else {
                    let id_user = usuario.id
                    db.Review.findAll({
                        where: {
                            id_user: id_user
                        }
                    }).then((reseniasXusuario) => {
                        res.render('myReviews', {
                            reseniasXusuario: reseniasXusuario
                        })
                    })
                }

            })
    },
    showEdit: function (req, res) {
        db.Review.findOne({
            where: [{ id: req.params.id }]
        })
            .then(resultado => {
                res.render('editReview', { resultado: resultado, error: req.query.Error })
            })
    },
    confirmEdit: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
            .then(usuario => {
                if (usuario != null) {
                    db.Review.update({
                        text: req.body.comment,
                        rating: req.body.rating
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            db.Review.findByPk(req.params.id)
                                .then(resultado => {
                                    res.redirect('/users/login')
                                })
                        })
                } else {
                    res.redirect('/users/misResenias/edit/' + req.params.id + '?Error=true')
                }
            })
    },
    deleteReview: function (req, res) {
        db.Review.findOne({
            where: [{ id: req.params.id }]
        })
            .then(resultado => {
            res.render('deleteReview', { resultado: resultado, error: req.query.Error })
        })      
    },
    confirmDelete: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
            .then(usuario => {
                if (usuario != null) {
                    db.Review.destroy({
                        where: [{
                            id: req.params.id,
                        }]
                    })
                    res.redirect('/users/login');
                } else {
                    res.redirect('/users/misResenias/delete/' + req.params.id + '?Error=true')
                }
            })
    },
    buscar: function (req, res) {
        res.render('buscadorDeUsuarios')
    },
    searchUserResults: function (req, res) {
        db.User.findAll({
            where: {
                [operadores.or]: {
                    email: { [operadores.like]: "%" + req.query.searchUser + "%" },
                    name: { [operadores.like]: "%" + req.query.searchUser + "%" }
                }
            }
        }).then(function (resultado) {
            res.render('searchUserResults', {
                users: resultado,
                busqueda: req.query.searchUser
            })
        })
    },
    detalle: function (req, res) {
        db.User.findOne({
            where: [{ id: req.params.id }],
            include: [{
                association: 'User_Reviews'
            }]
        }).then(detail => {
            res.render('detalleUsuario', {
                detail: detail,
            })

            //agregar aca las resenias
        })
    },
}

module.exports = usersController;