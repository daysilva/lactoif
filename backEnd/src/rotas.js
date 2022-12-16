const express = require('express')
const router = express.Router()


// controllers
const controler = require('../controllers/controller')

// ler dados json
const bodyParse = require('body-parser')
const jsonParser = bodyParse.json()



// rota de login
// usar uma função que se conecte ao banco
router.get('/login/:nome/:senha', jsonParser, controler.fazerlogin)

// mandar o nome dos tecnicos
router.get('/dados/tecnicos', jsonParser, controler.pegarTecnicos)


// mandar o nome dos auxiliares
router.get('/dados/auxiliares', jsonParser, controler.pegarAuxiliares)


// mandar os ingredientes e a quantidade
router.get('/dados/ingredientes', jsonParser, controler.PegarIngredientes)


// registrar a producao
router.post('/dados/registrar_producao', jsonParser, controler.CadastrarProducao)


router.get('/ola', (req, res) => {
    res.status(200).send("ooooiiiiaaaa")
})

module.exports = router