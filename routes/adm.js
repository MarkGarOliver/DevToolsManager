const express = require('express')
const router = express.Router()
const res = require('express/lib/response')

const mongoose = require('mongoose')
require('../models/Tarefa'), require('../models/Projeto')
// axios
const axios = require('axios')

const Tarefa = mongoose.model('tarefa')
const Projeto = mongoose.model('projeto')



//rotas
    //pagina principal
        router.get('/', (req, res)=>{
            


            async function getData(){
                
                //precisei pegar a data atual e formatar para o padrão da api, pois o link válido é sempre com a data atual
                const datanow = new Date()
                var dataNews = ''
                if(datanow.getMonth() > 9){
                    dataNews = `${datanow.getFullYear()}-${datanow.getMonth()}-${datanow.getDate()}`
                }else{
                    dataNews = `${datanow.getFullYear()}-0${datanow.getMonth()}-${datanow.getDate()}`               
                 }


                //tesla
                    const { data } = await axios(`https://newsapi.org/v2/everything?q=tesla&from=${dataNews}&sortBy=publishedAt&apiKey=3cbd15ffaf3d4377886a2aef972f6914`)

                    const allNewsTesla = data.articles
                    var TeslaNews = []

                    for(let i = 0; i < 3; i++){
                        TeslaNews.push(allNewsTesla[i])
                    }
                //Apple
                    const appleResponse = await axios(`https://newsapi.org/v2/everything?q=apple&from=${dataNews}&to=2022-04-27&sortBy=popularity&apiKey=3cbd15ffaf3d4377886a2aef972f6914`)

                    const allNewsApple = appleResponse.data.articles
                    var AppleNews = []

                    for(let i = 0; i < 3; i++){
                        AppleNews.push(allNewsApple[i])
                    }
                res.render('adm/home', {tesla: TeslaNews, apple: AppleNews})
            }
            getData()
        })

    //todolist
        //Tarefas Pendentes
            router.get('/todolist', (req, res)=>{

                Tarefa.find({estado: ''}).lean().sort({data: 'desc'}).then((tarefas)=>{

                    res.render('adm/todolist/tarefasPendentes', {tarefas: tarefas})
                })

            })

        //Tarefas Feitas
    
            router.get('/todolist/feitas', (req, res)=>{
                Tarefa.find({estado: 'concluida'}).lean().sort({data: 'desc'}).then((tarefasFeitas)=>{

                    res.render('adm/todolist/tarefasFeitas', {tarefasFeitas: tarefasFeitas})
                })
                
            })

        //Criar nova Tarefa
            router.post('/todolist/nova', (req, res)=>{

                const datanow = new Date()

                if(datanow.getMonth() > 9){
                    var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:${datanow.getMinutes()}`

                }else{

                    var data = `${datanow.getDate()}/0${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:${datanow.getMinutes()}`
                }


                const novaTarefa = ({
                    nome: req.body.nome,
                    comentario: req.body.coments,
                    dataExibicao: data
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

        //Mudar Status
        router.post('/todolist/mudarstatus', (req, res)=>{

            const id = `${req.body.id}`
            var status
            var redirect
            var msg
            if(req.body.button == 'Feito'){
                status = 'concluida'
                redirect = '/adm/todolist/feitas'
                msg = 'Tarefa marcada como FEITA'

            } else {
                status = ''
                redirect = '/adm/todolist'
                msg = 'Tarefa marcada como NÃO FEITA'

                
            }

            try {
                Tarefa.findByIdAndUpdate({_id: id}, {'estado': status}).lean().then((tarefa)=>{
                    req.flash('success_msg', msg)
                    res.redirect(redirect)
                })
                
            } catch (error) {
                if(status == 'concluida'){
                    req.flash('error_msg', 'Houve um erro ao marcar a tarefa como FEITA')
                    res.redirect('/adm/todolist')
                } else {
                    req.flash('error_msg', 'Houve um erro ao voltar a tarefa para PENDENTE')
                    res.redirect('/adm/todolist/feitas')
                }
            }

        })
   


        //Deletar tarefa
            router.post('/todolist/delete', (req, res)=>{
                Tarefa.findByIdAndRemove(req.body.id).then(()=>{
                    req.flash('success_msg', 'deletado com sucesso')
                    res.redirect('/adm/todolist/feitas')
                })
            })
    // TimeControl
            router.get('/timecontrol', (req, res)=>{
                Projeto.find().lean().sort({data: 'desc'}).then((projetos)=>{                    
                    res.render('adm/timecontrol/timeControl', {projetos: projetos})
                })

            })

            // Cria Novo Projeto
                router.post('/timecontrol/add/projeto', (req, res)=>{
                    const criarProjeto = () =>{

                        if(req.body.titulo == ''){
                            req.flash('error_msg', 'erro ao salvar nova tarefa, verifique se preencheu os campos corretamente ')
                            res.redirect('/adm/timecontrol')
                        } else {
                            new Projeto(novoProjeto).save().then(()=>{
                                req.flash('success_msg', 'Projeto Criado com Sucesso!')
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
            
            // Play em Projeto
                router.post('/timecontrol/play', (req, res)=>{
                    const id = req.body.id

                    const datanow = new Date()

                    if(datanow.getMonth() > 9){
                        if(datanow.getMinutes() > 9){
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:${datanow.getMinutes()}`
                        } else {
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:0${datanow.getMinutes()}`
                        }
                    }else{
                        if(datanow.getMinutes() > 9){
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:${datanow.getMinutes()}`
                        } else {
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:0${datanow.getMinutes()}`
                        }
                    }
                    
                    Projeto.findByIdAndUpdate(id, {dataPlay: new Date(), estado: 'trabalhando..', dataPlayExib: data}).then(()=>{
                        console.log('Check IN')
                        res.redirect('/adm/timecontrol')
                    }).catch((error)=>{
                        console.error(error)
                    })


                })

            // Stop em Projeto
                router.post('/timecontrol/stop', (req, res)=>{
                    const id = req.body.id
                    const datanow = new Date()

                    if(datanow.getMonth() > 9){
                        if(datanow.getMinutes() > 9){
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:${datanow.getMinutes()}`
                        } else {
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:0${datanow.getMinutes()}`
                        }
                    }else{
                        if(datanow.getMinutes() > 9){
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:${datanow.getMinutes()}`
                        } else {
                            var data = `${datanow.getDate()}/${datanow.getMonth()}/${datanow.getFullYear()} - ${datanow.getHours()}:0${datanow.getMinutes()}`
                        }
                    }
                    Projeto.findByIdAndUpdate(id, {dataStop: new Date(), estado: 'Parado', dataStopExib: data}).then(()=>{
                        
                        Projeto.find({_id: id}).lean().then((projeto)=>{
                            var stopDate = projeto[0].dataStop
                            var playDate = projeto[0].dataPlay
                            
                            var calcMilissegundos = Math.abs(stopDate.getTime() - playDate.getTime())
                            var calcMinutos = Math.ceil(calcMilissegundos / (1000 * 60))
                            
                            console.log(calcMinutos)
                            console.log(stopDate)
                            
                            var tempo = projeto[0].tempo

                            tempo = tempo + calcMinutos
                            
                            Projeto.findByIdAndUpdate(id, {tempo: tempo}).then(()=>{
                                console.log('check oout')
                            })
                            
                            // console.log('Check Out')
                        }).catch((error)=>{
                            console.error(error)
                        })

                        res.redirect('/adm/timecontrol')
                    }).catch((error)=>{
                        console.error(error)
                    })


                })

            //Form de edição do Projeto
                router.post('/timecontrol/editar', (req, res)=>{
                    const id = req.body.id
                    Projeto.find({_id: id}).lean().then((projeto)=>{


                        res.render('adm/timecontrol/editarProjeto', {pro: projeto})
                    })
                })

            // Edição do Projeto
                router.post('/timecontrol/edit/projeto', (req, res)=>{

                    const id = req.body.id

                    Projeto.findOneAndUpdate({_id: id}, {'titulo': req.body.titulo, 'descricao': req.body.descricao}).lean().then(()=>{
               
                        req.flash('success_msg', 'Alterações salvas com Sucesso !')
                        res.redirect('/adm/timecontrol')
                       
                    }).catch((error)=>{
                        req.flash('error_msg', 'houve um problema ao salvar as alterações !')
                        res.redirect('/adm/timecontrol')
                    })
                })
                
                










module.exports = router