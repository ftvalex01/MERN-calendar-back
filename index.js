const express = require("express")


const app = express()
const port = 3001

//Routes

app.get("/",(req,res)=>{
    console.log("bienvenido a la ruta home")
})




app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`)
})