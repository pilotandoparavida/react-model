const EquipamentoSchema = new global.mongoose.Schema({
    descricao: {
        type: String,
        required: true,
    },
    urlfoto: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        default: 0,
    },
    estado: {
        type: String,
        enum: ['NOVO', 'BOM', 'RUIM'],
        default: 'BOM',
        required: true,
    },
    finalidade: {
        type: String,
        enum: ['LRMC', 'PPV'],
        default: 'LRMC',
        required: true,
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

module.exports = global.mongoose.model('Equipamento', EquipamentoSchema); 