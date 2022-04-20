const express = require('express')
const router = express.Router()
const res = require('express/lib/response')

const mongoose = require('mongoose')
require('../models/Tarefa'), require('../models/Projeto')

const Tarefa = mongoose.model('tarefa')
const Projeto = mongoose.model('projeto')



//rotas
    //pagina principal
        router.get('/', (req, res)=>{
            res.render('adm/home')   
        })

    //todolist
        //Tarefas Pendentes
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

        //Marcar tarefa como feita
        router.post('/todolist/marcarcomofeita', (req, res)=>{

            const id = `${req.body.id}`

            Tarefa.findByIdAndUpdate({_id: id}, {'estado': 'concluida'}).lean().then((tarefa)=>{
                req.flash('success_msg', 'Marcada Como Feita')
                res.redirect('/adm/todolist/feitas')
            })
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
                Projeto.find().lean().then((projetos)=>{
                    
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

  
module.exports = router