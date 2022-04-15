const express = require('express')
const router = express.Router()
const res = require('express/lib/response')

const mongoose = require('mongoose')
require('../models/Tarefa')

const Tarefa = mongoose.model('tarefa')




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

            // revisar código marcar como feita, listar os feitos na view feitas
            // verificar código tarefa.save()
        
        //Deletar tarefa
            router.post('/todolist/delete', (req, res)=>{
                Tarefa.findByIdAndRemove(req.body.id).then(()=>{
                    req.flash('success_msg', 'deletado com sucesso')
                    res.redirect('/adm/todolist/feitas')
                })
            })
module.exports = router