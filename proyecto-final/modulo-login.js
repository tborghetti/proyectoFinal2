let db = require('./database/models')
const bcrypt = require('bcryptjs');

let moduloLogin = {
    chequearUsuario: function (email) {
        return db.User.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            return usuario != null;
        })
    },

    buscarPorEmail: function (email){
        return db.User.findOne({
            where: {
                email:email
            }
        })
        .then(resultado=> {
            return resultado
        })
    },

    validar: function (email, password) {
        return db.User.findOne({
            where:{
                email:email,

            },
        })
        .then(results=>{
            if (results && bcrypt.compareSync(password,results.password)){
                return results
            } else {
                return null
            }
        })
    }
}


module.exports = moduloLogin;