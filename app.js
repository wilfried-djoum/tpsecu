var express = require("express");
const path = require('path');

var app = express();
const router = express.Router();

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

app.post('/register', function (req, res) {

    //1- get data 
    console.log(req.body);
    // check the email format 
    // let email =document.getElementById('emailError')
    function validateEmailInput() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(req.body.username)) {
            // email.innerHTML = "Good Email"
            return true
        } else {
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
            return false
        }
    }

    //check similar password
    function checkSimilarPassword() {
        if (req.body.password == req.body.passwordConfirm) {
            return true
        } else {
            return false
        }
    }

    // sanitizer 
    function inputSanitizer() {
        // sanitize inputs 

    }

    //2- add user to database 
    if (validateEmailInput() && checkSimilarPassword() && strongPasswod()) {
        console.log("Tout est Bon");
    } else {
        console.log("Tous n'est pas bon");
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