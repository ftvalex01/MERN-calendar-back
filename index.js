const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

//servidor express
const app = express()

//base de datos
dbConnection()

//lectura del body
app.use(express.json())



//Rutas
app.use('/api/auth',require('./routes/auth'))


//Directorio publico

app.use(express.static("public"))








app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})