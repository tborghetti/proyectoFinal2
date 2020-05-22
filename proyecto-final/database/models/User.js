module.exports = (sequelize, DataTypes) => {
    let col = {
        id:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING(25)
        },
        email: {
            type: DataTypes.STRING(225)
        },
        password: {
            type: DataTypes.STRING(225)
        },
        birthday: {
            type: DataTypes.DATE(0)
        }
    }
    let config = {
        tableName: "user",
        timestamps: false
    }
const User = sequelize.define("User", col, config)
return User;
}
