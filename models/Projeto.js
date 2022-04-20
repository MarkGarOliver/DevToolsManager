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
    dataPlay: {
        type: Date
    },
    dataStop: {
        type: Date
    },
    tempo: { //vou armazenar em minutos e para mostrar faço as conversões em horas e afins
        type: Number,
        default: 0
    },
    estado: {
        type: String
    }
})


mongoose.model('projeto', Projeto)