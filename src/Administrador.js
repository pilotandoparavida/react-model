
const AdministradorSchema = new global.mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        default: '',
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

module.exports = global.mongoose.model('Administrador', AdministradorSchema);