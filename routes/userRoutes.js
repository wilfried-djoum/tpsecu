// routes/userRoutes.js
const express = require('express');
const passport = require('../js/passportConfig'); // Import de la configuration Passport.js
const roles = require('../js/roles'); // Import des rôles et des autorisations
const User = require('../js/userModel'); // Import du modèle utilisateur
const router = express.Router();

// Middleware pour vérifier les autorisations
function grantAccess(action, resource) {
    return (req, res, next) => {
        try {
            const permission = roles.roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(403).render('usersResult', { error: 'Accès refusé', users: [], user: req.user });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}
// Route pour lister les utilisateurs de notre base de données
router.get('/users', passport.authenticate('local', { session: false }), grantAccess('readAny', 'profile'), async (req, res) => {
    try {
        let users;

        // Si l'utilisateur est un administrateur, récupérer tous les utilisateurs
        if (req.user.role === 'admin') {
            users = await User.find();  // Récupérer tous les utilisateurs
        } else {
            // Si l'utilisateur est un utilisateur standard, récupérer seulement ses propres informations
            users = [req.user];  // Mettre l'utilisateur dans un tableau pour l'affichage dans la vue
        }

        // Rendre la vue usersResult.ejs avec les utilisateurs et l'utilisateur connecté
        res.render('usersResult', { users, user: req.user, error: null });

    } catch (err) {
        res.status(500).render('usersResult', { error: 'Erreur lors de la récupération des utilisateurs', users: [], user: req.user });
    }
});



module.exports = router;
