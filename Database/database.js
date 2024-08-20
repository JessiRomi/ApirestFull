
const {Sequelize} = require("sequelize"); 
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    "",
    {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port:3306,
}); // Configuración para la conexión con la BBDD


module.exports= sequelize