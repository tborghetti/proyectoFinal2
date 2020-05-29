let db = require('../database/models/index');
let operadores = db.Sequelize.Op;
const bcrypt = require('../node_modules/bcryptjs');
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
            res.send("Usuario creado")
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
                errores.push("Usuario invalido")
            }
            //if ( el puntaje no es un numero)

            if (errores.length == 0) {
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
            } else {
                res.send(errores)
                // Deberias enviar a la vista con el formulario de login y compartir los errores e impirmirlos
            }
            
            
        }) 
     

    }
}

module.exports = usersController;