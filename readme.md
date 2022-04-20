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

    ```
        /Tarefas pendentes

        router.get('/todolist', (req, res)=>{
            Tarefa.find({estado: ''}).lean().then((tarefas)=>{
                res.render('adm/todolist/tarefasPendentes', {tarefas: tarefas})
            })
        })

        //Tarefas Feitas

        router.get('/todolist/feitas', (req, res)=>{
            Tarefa.find({estado: 'concluida'}).lean().then((tarefasFeitas)=>{

                res.render('adm/todolist/tarefasFeitas', {tarefasFeitas: tarefasFeitas})
            })
            
        })

    
    ```

[x] Criar aplicação TodoList Front

- [x] Criar Model para Todolist

    ```
        const mongoose = require('mongoose')
        const Schema = mongoose.Schema


        const Tarefa = new Schema({
            nome: {
                type: String,
                require: true
            },
            comentario: {
                type: String,
                default: 'Comentario'
            },
            estado: {
                type: String,
                default: ''
            },
            data: {
                type: Date,
                default: Date.now()
            }
        })


        mongoose.model('tarefa', Tarefa)

    ```

- [x] Funcionalidade de criar  

    ```
        //Criar nova Tarefa
        router.post('/todolist/nova', (req, res)=>{
            const novaTarefa = ({
                nome: req.body.nome,
                comentario: req.body.coments
            })

            new Tarefa(novaTarefa).save().then(()=>{
                req.flash('success_msg', 'Tarefa Criada com Sucesso!')
                res.redirect('/adm/todolist')
            }).catch((error)=>{
                req.flash('error_msg', 'erro ao salvar nova tarefa, tente novamente ! ')
                res.redirect('/todolist/tarefasPendentes')
                console.error(error)
            })
        })
    
    ```
- [x] Funcionalidade de Marcar como Feito
    
    ```
        //Marcar tarefa como feita
        router.post('/todolist/marcarcomofeita', (req, res)=>{

        const id = `${req.body.id}`

        Tarefa.findByIdAndUpdate({_id: id}, {'estado': 'concluida'}).lean().then((tarefa)=>{
            req.flash('success_msg', 'Marcada Como Feita')
            res.redirect('/adm/todolist/feitas')
            })
        })
    ```
- [x] Funcionalidade de Deletar

    ```
        //Deletar tarefa
        router.post('/todolist/delete', (req, res)=>{
            Tarefa.findByIdAndRemove(req.body.id).then(()=>{
                req.flash('success_msg', 'deletado com sucesso')
                res.redirect('/adm/todolist/feitas')
            })
        })

    ```

### TimeControl

Estrutura collection MongoDb: 
- nome do projeto
- pessoal ou empresarial
- descrição do projeto
- data de criação
- tempo de Trabalhado
- estado (parado, trabalhando)

Funcionalidade:

- Play e Stop
    - quando estiver trabalhando dar play e quando para stop, para contabilizar as horas trabalhadas

- editar as informações do projeto

[x] Criar Model para a aplicação

```
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema


    const Projeto = new Schema({
        titulo: {
            type: String,
            require: true
        },
        descricao: {
            type: String,
            default: 'Comentario'
        },
        tipo: {
            type: String,
            default: 'Projeto Pessoal Default'
        },
        data: {
            type: Date,
            default: Date.now
        },
        tempoTrabalhadoEmSec: { //vou armazenar em segundos e para mostrar faço as conversões em minutos horas e afins
            type: Number,
            default: 0
        }
    })


    mongoose.model('projeto', Projeto)

```

[x] Criar View e rota para a aplicação
    
```
    router.get('/timecontrol', (req, res)=>{
        Projeto.find().lean().then((projetos)=>{
            
            res.render('adm/timecontrol/timeControl', {projetos: projetos})
        })
    })

```
[ x ] Funcionalidade para criar novo projeto

```
    // Cria Novo Projeto
    router.post('/timecontrol/add/projeto', (req, res)=>{
        const criarProjeto = () =>{

            if(req.body.titulo == ''){
                req.flash('error_msg', 'erro ao salvar nova tarefa, verifique se preencheu os campos corretamente ')
                res.redirect('/adm/timecontrol')
            } else {
                new Projeto(novoProjeto).save().then(()=>{
                    req.flash('success_msg', 'Projeto Criada com Sucesso!')
                    res.redirect('/adm/timecontrol')
                }).catch((error)=>{
                    req.flash('error_msg', 'erro ao salvar nova tarefa, tente novamente ! ')
                    res.redirect('/adm/timecontrol')
                    console.error(error)
                })  
            }
            
        }

        if(req.body.projetopessoal == undefined){
            
            var novoProjeto = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                tipo: req.body.projetoempresarial
            }

            criarProjeto()
        } else if (req.body.projetoempresarial == undefined) {
            var novoProjeto = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                tipo: req.body.projetopessoal
            }  
            
            criarProjeto()
        } else {
            req.flash('error_msg', 'Falha ao criar o projeto')
            res.redirect('/adm/timecontrol')
        }

    })

```

[] Editar informações do projeto

[] TimeControl | play and stop

    obs: 
        - Processamento será feito no back-end
        
        - trabalhar com minutos | setInterval
        
        - a cada um minuto adicionar no banco de dados um minuto
        
        - talvez renderizar a página principal novamente para não perder o processo de contabilizar o tempo
        
        - para exibir fazer as devidas conversões
        
        - adicionar campo no model: estado = trabalhando ou parado
        
        - exibir o estado do projeto com uma cor, trabalhando verde, parado vermelho.
