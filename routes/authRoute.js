// routes/authRoutes.js
const express = require('express');
const passport = require('../js/passportConfig'); // Import de la configuration Passport.js
const router = express.Router();

// Route de connexion
router.post('/login', passport.authenticate('local', {
     // Rediriger en cas de succès
     successRedirect: '/users',
     // Rediriger en cas d'échec
     failureRedirect: '/login',
     // Afficher les messages d'échec (si connect-flash est utilisé)
     failureFlash: true
}));

// Route de déconnexion
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

module.exports = router;