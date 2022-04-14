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
    - session
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
        const session = require('session')
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