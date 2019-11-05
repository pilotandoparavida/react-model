// const { Schema, model } = require('mongoose');

const AlunoSchema = new global.mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    nascimento: {
        type: String,
        required: true,
    },
    cidade: String,
    celular: {
        type: String,
        required: true,
    },
    rg: {
        type: String,
        required: true,
    },
    cnh: {
        type: String,
        required: true,
    },
    ufcnh: {
        type: String,
        required: true,
    },
    anocnh: Number,
    sexo: String,
    certificado: String,
    estado: {
        type: String,
        enum: ['ATIVO', 'BLOQUEADO'],
        default: 'ATIVO',
        required: true,
    },
    dataestado: {
        type: Date, // mes/dia/ano
        required: true,
    },
    turma: {
        type: global.mongoose.Schema.Types.ObjectId,
        ref: 'Turma',
        required: false,
        default: null
    }
}, {
    timestamps: true,
});

// AlunoSchema.path('rg').validate(function (value) {
//     var split = value.split(".");
//     if (split.length !== 3) {
//         return false;
//     } else {
//         var split2 = split[2].split("-");
//         if (split2.length !== 2) {
//             return false;
//         }
//     }
//     return true;
// }, 'RG fora do padrão XXX.XXX.XXX-XX.');

AlunoSchema.path('nascimento').validate(function (value) {
    var regExpCaracter = /[^\d]/;     //Expressão regular para procurar caracter não-numérico.
    var regExpEspaco = /^\s+|\s+$/g;  //Expressão regular para retirar espaços em branco.
    if (value.length !== 10) {
        return false;
    }
    var splitData = value.split('/');
    if (splitData.length !== 3) {
        return false;
    }
    splitData[0] = splitData[0].replace(regExpEspaco, '');
    splitData[1] = splitData[1].replace(regExpEspaco, '');
    splitData[2] = splitData[2].replace(regExpEspaco, '');
    if ((splitData[0].length !== 2) || (splitData[1].length !== 2) || (splitData[2].length !== 4)) {
        return false;
    }
    if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2])) {
        return false;
    }

    return true;
}, 'Data de nascimento fora do padrão XX/XX/XXXX.');

AlunoSchema.path('cnh').validate(function (value) {
    var char1 = value.charAt(0);
    var dv1, dv2;

    value = value.replace(/[^\d]/g, '');

    if ((value.length !== 11 && value.length !== 9) || char1.repeat(11) === value) {
        return false;
    }

    if (value.length === 9) {
        value = '00' + value;
    }

    for (var sum = 0, i = 0, j = 9; i <= 8; i++ , j--) {
        sum += (j * +value[i]);
    }

    dv1 = sum % 11;

    var incrDig2 = dv1 === 10 ? -2 : 0;

    if (dv1 > 9) {
        dv1 = 0;
    }

    for (sum = 0, i = 0, j = 1; i <= 8; i++ , j++) {
        sum += (j * +value[i]);
    }

    if ((dv2 = ((sum % 11) + incrDig2) < 0 ? 11 + (sum % 11) + incrDig2 : (sum % 11) + incrDig2) > 9) {
        dv2 = 0;
    }

    if (dv1 != value[9] || dv2 != value[10]) {
        return false;
    }

    return true;
}, 'CNH inválida.');

AlunoSchema.path('cpf').validate(function (value) {
    value = value.split(/[\s.-]+/);
    value = value[0] + value[1] + value[2] + value[3];
    value = value.split("");

    if (value == "00000000000") return false;

    var Soma;
    var Resto;
    // 1o digito
    Soma = 0;
    for (var i = 0; i < 9; i++) {
        Soma = Soma + value[i] * (10 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) {
        Resto = 0;
    }
    if (Resto != value[9]) {
        return false;
    }

    // 2o digito
    Soma = 0;
    for (var i = 0; i < 10; i++) {
        Soma = Soma + value[i] * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) {
        Resto = 0;
    }
    if (Resto != value[10]) {
        return false;
    }

    return true;

}, 'CPF inválido ou fora do padrão XXX.XXX.XXX-XX.');

// createdAt, updatedAt - criado automático e atualizado pelo mongoose pela estrutura timestamp adicionada ao final

module.exports = global.mongoose.model('Aluno', AlunoSchema); // nome do módulo e o esquema