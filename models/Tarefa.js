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
    },
    dataExibicao: {
        type: String
    }
})


mongoose.model('tarefa', Tarefa)