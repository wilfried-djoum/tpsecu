const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (() => {
    // Droits pour les utilisateurs standards
    ac.grant('user')
        .readOwn('profile'); // L'utilisateur peut uniquement lire son propre profil

    // Droits pour les administrateurs
    ac.grant('admin')
        .extend('user') // L'administrateur hérite des droits de l'utilisateur standard
        .readAny('profile'); // L'administrateur peut lire tous les profils

    return ac; // Retourner l'objet AccessControl
})();
