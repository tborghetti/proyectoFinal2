let db = require('../database/models/index');
let operadores = db.Sequelize.Op;
const bcrypt = require('../node_modules/bcryptjs');
// npm bcrypt requiero arriba
//correr en terminal npm install bcryptjs

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
}

module.exports = usersController;