//configuration de passeport
const passeport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User = require('./userModel')


// Configuration de la stratégie locale pour Passport
passeport.use(new LocalStrategy({
    usernameField: 'email', // Utiliser l'email comme champ d'authentification
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Email incorrect' });
        }

        // Comparer le mot de passe haché
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Mot de passe incorrect' });
        }

        // Si tout est bon, renvoyer l'utilisateur
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Sérialiser et désérialiser l'utilisateur dans les sessions
passeport.serializeUser((user, done) => {
    done(null, user.id);
});

passeport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

//exportation du module passport
module.exports = passeport