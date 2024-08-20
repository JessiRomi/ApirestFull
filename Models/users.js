
const { DataTypes } = require("sequelize");
const sequelize = require("../Database/database");

//.......construcción de la BBDD...............

const User = sequelize.define('User', {
    
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true,
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },


    password: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
},{
    timestamps: true,
});

module.exports = User;