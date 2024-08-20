const express = require('express');
const sequelize = require('./Database/database.js');
const userRoute = require("./Routes/routes.js");
require('dotenv').config();

const server = express(); // Crea una nueva instancia de Express
server.set('port', 3000); // Se se indica el puerto

server.use(express.json());

server.use("/api/users", userRoute); 

sequelize.sync()
 .then(()=>{
    console.log('Database sincronizada con exito');

    // Escucha las peticiones en el puerto configurado
    server.listen(server.get('port'), () => {
        console.log("Estás corriendo por el puerto 3000");
    }); 
 })
 .catch((error)=> console.log('No se conecto a la base de datos', error));


