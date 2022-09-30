const express = require("express");
require("dotenv").config();

const app = express()
app.use(express.json())



//Rutas
app.use('/api/auth',require('./routes/auth'))

//lectura del body

//Directorio publico

app.use(express.static("public"))




app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})