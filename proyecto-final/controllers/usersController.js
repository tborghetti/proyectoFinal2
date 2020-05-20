let db = require('../database/models');
let operadores = db.Sequelize.Op;

let usersController = {
    registerUser: function(req, res) {
        db.User.findAll()
        .then((users) => {
            res.render("registro", {
                users: users
            })
        })    
    },
}

module.exports = usersController;