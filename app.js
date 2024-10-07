var express = require("express");
const path = require('path');

//importation des configurations de la base de données
const mongoDB = require('./js/config')
const User = require('./js/userModel')

var app = express();

//appel de la fonction pour connecter a la base de données
mongoDB()
const router = express.Router();

// Importer les outils de validation
const { body, validationResult } = require('express-validator');

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

router.get("/", function (req, res) {
    res.render('index');
});

router.get("/register", function (req, res) {
    res.render('register');
});

app.post('/register', async function (req, res) {
    let error=[]

    //1- get data 
    console.log(req.body);
    // check the email format 
    // let email =document.getElementById('emailError')
    function validateEmailInput() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(req.body.email)) {
            // email.innerHTML = "Good Email"
            return true
        } else {
            errors.push('Email invalide. Veuillez entrer un email valide.');
            return false
        }
    }
    // check strong password 
    function strongPasswod() {
        // utilisation de l'expression reguliere pour verifier la robustesse du mot de passe 
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

        if (passwordPattern.test(req.body.password)) {
            console.log("pass fort");
            return true
        } else {
            console.log("pass faible");
            errors.push('Le mot de passe doit contenir au moins 12 caractères, avec des majuscules, minuscules, chiffres et caractères spéciaux.');
            return false
        }
    }

    //check similar password
    function checkSimilarPassword() {
        if (req.body.password == req.body.passwordConfirm) {
            return true
        } else {
            errors.push('Les mots de passe ne correspondent pas.');
            return false
        }
    }

    // sanitizer 
    function inputSanitizer() {
        // sanitize inputs 

    }

    // Fonction pour insérer l'utilisateur dans la base de données
    async function addUserToDatabase() {
        // S'il y a des erreurs, les envoyer à la vue
        if (errors.length > 0) {
            console.log("Erreurs de validation :", errors);
            return res.status(400).render('register', { errors });  // 'register' est la vue de ton formulaire
        }
        try {
            // on cree la structure au format Json ressemblant au model user 
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password, // Le mot de passe sera haché automatiquement par le modèle
                role: req.body.role || 'user' // Par défaut, rôle 'user'
            });

            // Enregistrer l'utilisateur dans la base de données
            await newUser.save();
            console.log("Utilisateur enregistré avec succès.");
            res.status(201).redirect('/login'); // Rediriger vers la page de connexion après inscription réussie
        } catch (err) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", err);
            res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur.');
        }
    }

    //2- add user to database 
    if (validateEmailInput() && checkSimilarPassword() && strongPasswod()) {
        console.log("Tout est Bon");
        await addUserToDatabase();
    } else {
        console.log("Tous n'est pas bon");
        res.status(400).send("Données invalides. Veuillez vérifier vos informations.");
    }
    //3- if success redirect to login
    //res.render('login');

});

//Showing login form
router.get("/login", function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {

    //1- get data 
    console.log(req.body);

    //2- authenticate user 

    //3- if success redirect to home page 
    //res.render('home');

});

app.use('/', router);

var port = process.env.PORT || 9000;

app.listen(port, function () {
    console.log("Server Has Started! port: ", port);
});