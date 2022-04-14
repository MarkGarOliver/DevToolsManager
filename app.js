const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('session')
const flash = require('connect-flash')
const { append } = require('vary')
const adm = require('./routes/adm')
//Config
    //express
        const app = express()
    //body-parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: {
            allowProtoMethodsByDefault: true, 

            allowProtoPropertiesByDefault: true
        }}))
        app.set('view engine', 'handlebars')
        app.set('views', './views')
    //public bootstrap
        app.use(express.static(path.join(__dirname + '/public')))

//rotas
        app.use("/adm", adm)


//outros
const port = 1104

app.listen(port, ()=>{
    console.log('Server on...')
})