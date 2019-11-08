// const { Schema, model } = require('mongoose');

const TurmaSchema = new global.mongoose.Schema ({
    data: {
        type: Date, // mes/dia/ano
        required: true,
    },
    datainscricao: {
        type: Date, // mes/dia/ano
        required: true,
    },
    vagas: {
        type: Number,
        default: 20,
    },
    endereco: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    totalinscritos: {
        type: Number,
        default: 0,
    },
    estado: {
        type: String,
        enum: ['ATIVA', 'CONCLUIDA', 'CANCELADA'],
        default: 'ATIVA',
    },
    confirmar: { // permite identificar se a turma aceita confirmação, isto será utilizado para turma de espera e turmas passadas (fechadas).
        type: Boolean,
        require: true
    },
    googlemaps: {
        type: String,
    },
    adm: {
        type: global.mongoose.Schema.Types.ObjectId,
        ref: 'Administrador',
        required: true,
        default: null
    }
}, {
    timestamps: true,
});

// createdAt, updatedAt - criado automático e atualizado pelo mongoose pela estrutura timestamp adicionada ao final
module.exports = global.mongoose.model('Turma', TurmaSchema); // nome do módulo e o esquema