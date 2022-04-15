# Dev Tools System

## ideia
    
- sistema onde terei diversas ferramentas dev como: 

    - TodoList 
        - cadastrar novas tarefas
        deletar tarefas

        - tarefas a fazer = page home
        quando marcar uma tarefa como feita ela deve ir para outro lugar de tarefas feitas
        nas tarefas feitas deve ter opção de mover para as tarefas não feitas

        - para isso terei duas collections, fazerTarefas e feitasTarefas. Quando marcar como feita elá irá para a collection feitasTarefas
    

    - ProjectTimeControl
        
        - Cadastrar novos projetos
        Deletar projetos

        - dentro de cada projeto eu devo conseguir dar um 'play' e um 'stop' que contabilizará as horas trabalhadas naquele projeto. Para isso posso armazenar a data e hora que dei o play e a data e hora que dei o stop. para mostrar quantas horas trabalhei no projeto, devo ver a diferença do horário que dei play e o stop.

## Planejamento

- Modulos e recursos
    - express
    - express-handlebars
    - body-parser
    - path
    - mongoose
    - express-session
    - flash
    - bootstrap

- Views
    - Grupo Admin
        - home
        - todolist
        - ProjecTimeControl
        - Sobre
    - Grupo Visitante
        - Sobre

- Collections MongoDB
    - AfazerTarefas
    - FeitasTarefas

## step by step


### Download dos Modulos | importar no app.js | Configurações inicias

[x] Download

    - npm install --save express express-handlebars body-parser path mongoose session flash

[x] Importar modulos no app.

    ```
        const express = require('express')
        const handlebars = require('express-handlebars')
        const bodyParser = require('body-parser')
        const path = require('path')
        const session = require('express-session')
        const flash = require('connect-flash')

    ```
[x] Configurações Iniciais

    ```
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

    ```

[x] Estruturar pastas base

- models

- public
    - css
    - js
    - img

- routes

-views
    - layouts

    - partials
    
    - adm

    
[x] Configurar e Validar se o Bootstrap está ok

Em app.js:

```
    //public bootstrap
        app.use(express.static(path.join(__dirname + '/public')))

```
Na view main do handlebars: 

```

    <link rel="stylesheet" href="/css/bootstrap.css">

```


[x] Criar repositório Git e GitHub


[x] Configurar Session e connect-flash para exibição de erros 
em app.js: 

    ```
        //sessão
            app.use(session({
                secret: 'SnruYtwx9vfxx7ghZZ',
                resave: true,
                saveUnitialized: true
            }))
            app.use(flash())
        //Middleware
            app.use((req, res, next) =>{
                res.locals.success_msg = req.flash("success_msg")
                res.locals.error_msg = req.flash("error_msg")

                next()
            })
        
    ```

[x] Criar partials para exibição de erros e colocar no main.handlebars

Em partials/_msg.handlebars

    ```
        {{#if success_msg}}
            <div class="alert alert-success">
                {{success_msg}}
            </div>
        {{/if}}

        {{#if error_msg}}
            <div class="alert alert-danger">
                {{error_msg}}
            </div>
        {{/if}}
        
    ```

[x] Configurar o Banco de dados Mongodb com Mongoose

Em app.js

    ```
    
        mongoose.connect('mongodb://localhost/DevTools').then(()=>{
            console.log('Conectado ao Banco de dados...')
        }).catch((error)=>{
            console.error(error)
        })
    
    
    ```

### TodoList

[x] Criar rota para a aplicação TodoList

[] Criar aplicação TodoList

[] Criar Model para Todolist

