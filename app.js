const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const { append } = require('vary')
const adm = require('./routes/adm')
const mongoose = require('mongoose')
const res = require('express/lib/response')
//Config
    //express
        const app = express()
    //sessão
        app.use(session({
            secret: 'SnruYtwx9vfxx7ghZZ',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")

            next()
        })
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
    
    //mongoose
        mongoose.connect('mongodb://localhost/DevTools').then(()=>{
            console.log('Conectado ao Banco de dados...')
        }).catch((error)=>{
            console.error(error)
        })
//rotas

    //raiz
        app.get('/', (req, res)=>{
            res.redirect('/adm')
        })
    
    //grupo de rotas adm
        app.use("/adm", adm)    

    
    //javascript para timecontrol

        app.get('/public/javascript.js', (req, res)=>{
            res.sendfile(__dirname + '/public/javascript.js')
            // res.send('rota ok')
        })
//outros
const port = 1104

app.listen(port, ()=>{
    console.log('Server on...')
})