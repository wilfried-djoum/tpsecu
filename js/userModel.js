const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

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


//hashage du mot de passe avant de sauvegarder
schemaUtilisateur.pre('save', async function (next) {  // Utilisation de 'function' au lieu de flèche
    try {
        const user = this; // Accéder à l'instance de l'utilisateur
        if (user.isModified('password')) {  // Vérifier si le mot de passe a été modifié ou est nouveau
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt); // Hacher le mot de passe
        }
        next();
    } catch (err) {
        next(err);
    }
});


//creer et exporter le model utilisateur
const User = mongoose.model('User', schemaUtilisateur);
module.exports = User;