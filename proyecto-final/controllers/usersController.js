let db = require('../database/models');
let operadores = db.Sequelize.Op;
var bcrypt = require('bcryptjs');
// npm bcrypt js google requerir aca
//corri en terminal npm install bcryptjs

let usersController = {
    createUser: function(req, res) {
        // encriptado de password usando bcrypt js
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday
        })
        .then((users) => {
            res.redirect("/veoVeo/home")
        })    
    },
}

module.exports = usersController;