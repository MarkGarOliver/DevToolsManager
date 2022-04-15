const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Tarefa')

const Tarefa = mongoose.model('Tarefa')




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
                res.render('adm/todolist/tarefasFeitas')
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



module.exports = router