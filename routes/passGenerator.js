const express = require('express')
const router = express.Router()
const res = require('express/lib/response')





//Home
    router.get('/', (req, res)=>{
        res.render('passGenerator/home')
    })
















module.exports = router