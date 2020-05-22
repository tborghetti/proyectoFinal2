let db = require('../database/models');
let operadores = db.Sequelize.Op;
var bcrypt = require('../node_modules/bcryptjs');
// npm bcrypt requiero arriba
//correr en terminal npm install bcryptjs

let usersController = {
    createUser: function(req, res) {
        // encriptado de password usando bcrypt js (encryptPassword)
        let encryptPassword = bcrypt.hashSync(req.body.password,10);
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptPassword,
            birthday: req.body.birthday
        })
        .then((users) => {
            res.redirect("/veoVeo/home")
        })    
    },
}

module.exports = usersController;