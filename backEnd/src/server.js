var express = require('express');
var app = express();


// configurando cors
const cors = require("cors")
app.use(cors())


// importar rotas
const router = require('./rotas')
app.use(router)


app.listen(3333, () => {
    console.log("servidor rodando...")
})