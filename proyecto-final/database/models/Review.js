module.exports = (sequelize, DataTypes) => {
    let col = {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        id_serie: {
            type: DataTypes.INTEGER(11),
        },
        id_user:{
            type: DataTypes.INTEGER(11),
        },
        text: {
            type: DataTypes.STRING(100),
        },
        rating:{
            type: DataTypes.DECIMAL(3,1),
        }
    }
    let config = {
        tableName: "review", 
        createdAt: "created_at",
        updatedAt: "updated_at", 
        timestamps: true 
    }
    const Review = sequelize.define("Review", col, config)
    
    Review.associate = function(models){
        Review.belongsTo(models.User,{ 
            as: "Review_User",
            foreignKey: "id_user"
           });
        }
    
           return Review
}
