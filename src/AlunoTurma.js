// const { Schema, model } = require('mongoose');

const AlunoTurmaSchema = new global.mongoose.Schema ({
    aluno: {
        type: global.mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true,
    },
    turma: {
        type: global.mongoose.Schema.Types.ObjectId,
        ref: 'Turma',
        required: true,
    },
    estado: {
        type: String,
        enum: ['INSCRITO', 'CONFIRMADO', 'TRANSFERIDO', 'CANCELADO', 'FALTOSO', 'CONCLUIDO'],
        required: true,
    },
    confirmar: {
        type: Boolean,
        require: true,
    },
    adm: {
        type: global.mongoose.Schema.Types.ObjectId,
        ref: 'Administrador',
        required: false,
        default: null
    }
}, {
    timestamps: true,
});

module.exports = global.mongoose.model('AlunoTurma', AlunoTurmaSchema); // nome do módulo e o esquema