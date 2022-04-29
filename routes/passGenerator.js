const express = require('express')
const router = express.Router()
const res = require('express/lib/response')





//Home
    router.get('/', (req, res)=>{
        res.render('passGenerator/home')
    })

    router.post('/gerarsenha', (req, res)=>{
    

       let tipoSenha = req.body.flexRadioDefault
       let tamSenha = req.body.tamanho
       let password = ''
       var chars = ''

       if(tipoSenha === 'num'){
           chars = '0123456789'
       } else if(tipoSenha === 'letras'){
           chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ'
       } else {
           chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ'
       }

       

       for (var i = 0; i < tamSenha; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        res.render('passGenerator/home', {senha: password, tamanho: tamSenha})

    })














module.exports = router