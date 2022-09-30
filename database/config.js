

const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
       mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Conexion establecida con exito")
    } catch (error) {
        console.log(error)
        throw new Error("error al arrancar base de datos")
    }
}


module.exports={
    dbConnection
}