const express = require('express')
const router = express.Router()






//rotas
    router.get('/', (req, res)=>{
        res.render('adm/home')
    })









module.exports = router