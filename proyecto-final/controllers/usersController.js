let db = require('../database/models/index');
let operadores = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
// npm bcrypt requiero arriba
//correr en terminal npm install bcryptjs
const moduloLogin = require('../modulo-login')

let usersController = {
    createUser: function(req,res) {
        res.render("registro")  
    },
    storeUser:function(req,res){
        let user = {
            name: req.body.name,
            email:req.body.email,
            birthday: req.body.birthday,
            password:bcrypt.hashSync(req.body.password,10),
        }
        db.User.create(user)
        .then(()=> {
            res.redirect('./login')
        })
    },
    login: function(req,res){
        res.render('login')
    },
    myReviews: function(req,res){
        moduloLogin.validar(req.body.email, req.body.password)
        .then((usuario)=> {
            let errores = []

            // Vas a tener que hacer un if por cada cosa que quieras validar
            if (usuario == null) 
            {
                res.redirect('login',{
                errores:errores
            })  // Deberias enviar a la vista con el formulario de login y compartir los errores e impirmirlos
            }
            //if ( el puntaje no es un numero)

            else{
                let id_user = usuario.id
                db.Review.findAll({
                    where: {
                        id_user: id_user
                    }
                }).then((reseniasXusuario) =>{
                    res.render('myReviews', {
                        reseniasXusuario: reseniasXusuario
                    })
                })
            }    
            
        }) 
    },
    showEdit: function(req,res){
        db.Review.findOne({
            where: [{id: req.params.id}]
        })
        .then(resultado => {
            res.render('editReview', {resultado:resultado, error: req.query.Error})
        })
    },
    confirmEdit: function(req,res){
        moduloLogin.validar(req.body.email, req.body.password)
        .then(usuario => {
            if (usuario != null) {
        let updateR = {
            text: req.body.comment,
            rating: req.body.rating,
            idR: req.params.id
        }

        db.Review.update({
            text: updateR.text,
            rating: updateR.rating
        },{
            where: {
                id: updateR.idR
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
    deleteReview: function(req,res){
        db.Review.findOne({
            where: [{id: req.params.id}]
        })
        .then(resultado => {
            res.render('deleteReview', {resultado:resultado, deleteId:req.params.id})
        })
    },
    confirmDelete: function(req,res){
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
                res.redirect('/users/misResenias/delete/' + req.params.id)
            }
        })
    },
    buscar: function(req,res){
        res.render('buscadorDeUsuarios')
    },
    detalle:function(req,res){
        db.User.findOne({
            where: [{id: req.params.id}],
            include: [{
                association: 'User_Reviews'
            }]
        }).then(detail => {
            res.render('detalleUsuario', {
                detail:detail,
            })
        
           //agregar aca las resenias
        })
    },
}

module.exports = usersController;