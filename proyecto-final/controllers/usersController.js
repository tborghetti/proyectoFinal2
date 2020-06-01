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
            res.render('editReview', {resultado:resultado})
        })
    },
    confirmEdit: function(req,res){

    },
    deleteReview: function(req,res){

    },
    confirmDelete: function(req,res){

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