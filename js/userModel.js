const mongoose = require('mongoose')

//definition du schéma des utilisateurs
const schemaUtilisateur = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true })


//creer et exporter le model utilisateur
const User = mongoose.model('User', schemaUtilisateur);
module.exports = User;