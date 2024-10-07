const AccessControl = require("accesscontrol")
const ac = new AccessControl();

exports.roles = (() => {
    //utilisateurs standards
    ac.grant('user')
        .readOnly('profile'); //il peut juste regarder son profil

    //droits du super administrateur
    ac.grant('admin')
        .extend('user') //ce dernier herite des droits de l'utilisateur simple
        .readAny('profile') //il peut lire tous les profiles

    return ac
})();