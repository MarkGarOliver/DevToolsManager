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