const express = require("express");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const secret = require("./secret.json");

const db = require("./db.js");

const app = express();
const hb = require("express-handlebars");

const bcrypt = require("bcryptjs");

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function confirmPassword(initial, confirmation) {
    //todo
    return new Promise();
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
}

app.engine("handlebars", hb());
app.set("view engine", "handlebars");
var title =
    "Make SPICED hoodies that are slightly lighter grey than the ones that are currently on offer, \n again";

app.use(
    cookieSession({
        secret: `${secret.secret}`,
        maxAge: 1000 * 60 * 60 //* 24 * 7 * 2
    })
);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(express.static(__dirname + "/public"));

app.get("/thankyou", (req, res) => {
    var results = db
        .selectAll()
        .then(result => {
            console.log(results);
            return results;
        })
        .catch(err => {
            console.log(err);
        });
    console.log(results);
    res.render("thankyou", {
        layout: "main",
        cause: {
            title: title
        },
        amount: results,
        navItems: [
            { name: "petition page", link: "/" },
            { name: "see who else has signed", link: "/signatures" }
        ]
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main",
        csrfToken: req.csrfToken
    });
});

app.get("test", (req, res) => {
    hashPassword(req.body.password);
    db.getHash("fuckas");
});

app.post("/login", (req, res) => {
    var pword = hashPassword(req.body.password);
    db.getHash("ass")
        .then(result => {
            console.log("result", result);
        })
        .catch(error => {
            console.log("error", error);
        });
});

app.get("/signatures", (req, res) => {
    res.render("signatures", {
        layout: "main",
        navItems: [
            {
                name:
                    "sign up again with a different email to inflate our numbers!",
                link: "/"
            }
        ]
    });
});

//app.use(csurf());

app.get("/", (req, res) => {
    res.render("register", {
        layout: "main",
        cause: {
            title: title
        },
        csrfToken: req.csrfToken,
        navItems: [
            { name: "see who else has signed already", link: "/signatures" }
        ]
    });
});

app.post("/", (req, res) => {
    //console.log('hello');
    const password = hashPassword(req.body.password);
    db.selectAll()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    db.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        password,
        req.body.signature
    )
        .then(values => {
            console.log("values", values);
        })
        .catch(error => {
            res.redirect("/");
            console.log("ahhhh");
            console.log(error.msg);
        });
    //spicedPg.createUser(req.body.firstName,req.body.lastName,req.body.email,req.body.password,req.body.signInput)
    // console.log(req.body);
    // console.log(req.session); //this is what is used with csurf
    if (res.err) {
        console.log("ahh no its fucked");
        res.redirect("/");
    }
    res.redirect("/profile");
});

app.get("/edit", (req, res) => {
    res.render("edit", {
        navItems: [{ name: "See your fellow supporters", link: "/signatures" }],
        layout: "main",
        cause: "",
        csrfToken: req.csrfToken
    });
});

app.get("/profile", (req, res) => {
    //TODO:: redirect logged in users to /profile/edit
    res.render("profile", {
        layout: "main",
        cause: {
            title: title
        },
        csrfToken: req.csrfToken
    });
});

app.post("/profile", (req, res) => {
    res.redirect("/thankyou");
});

app.listen(8080, () => console.log("SERVER ONLINE"));
