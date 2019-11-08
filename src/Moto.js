// const { Schema, model } = require('mongoose');

const MotoSchema = new global.mongoose.Schema ({
    marca: String,
    modelo: String,
    placa: {
        type: String,
        required: true,
    },
    aluno: {
        type: global.mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true,
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

MotoSchema.path('placa').validate(function (value) {
    var regExpGeral = /^[a-z,A-Z]{3}\-\d.\d{2}/;
    return regExpGeral.test(value);
}, 'Placa inválida.');

// createdAt, updatedAt - criado automático e atualizado pelo mongoose pela estrutura timestamp adicionada ao final

module.exports = global.mongoose.model('Moto', MotoSchema); // nome do módulo e o esquema