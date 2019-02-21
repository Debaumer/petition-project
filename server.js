const express = require("express");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieSession = require("cookie-session");

const db = require("./db.js");
const secret = require("./secret.json");
const bcrypt = require("./bcrypt");

const app = express();

const hb = require("express-handlebars");
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
    res.setHeader("X-Frame-Options", "DENY");
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(express.static(__dirname + "/public"));

app.get("/thankyou", (req, res) => {
    db.getSignerCount().then(n => {
        //should be all signatures with a limit on it
        //console.log(n);
        res.render("thankyou", {
            layout: "main",
            amount: n.rowCount
        });
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main",
        csrfToken: req.csrfToken
    });
});

app.post("/login", (req, res) => {
    req.body.password = bcrypt
        .hashPw(req.body.password)
        .then(pw => {
            console.log("pw:" + pw);
        })
        .catch(err => {
            console.log("ERROR:" + err);
        });
    console.log(req.body.password);
    db.login(req.body.email, req.body.password)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log("ERROR", err);
            res.render("login", {
                layout: "main",
                error: err
            });
        });
});

app.get("/signatures", (req, res) => {});

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
    req.body.password = bcrypt
        .hashPw(req.body.password)
        .then(pw => {
            console.log("pw:" + pw);
        })
        .catch(err => {
            console.log("ERROR:" + err);
        });
    db.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    )
        .then(values => {
            res.redirect("/profile");
            console.log("values", values);
        })
        .catch(err => {
            console.log(err.detail);
            res.render("register", {
                layout: "main",
                error: err,
                msg: err
            });
        });
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

app.post("/profile", (req, res) => {});

app.get("/sign", (req, res) => {
    res.render("sign", {
        layout: "main",
        cause: title,
        csrfToken: req.csrfToken
    });
});

app.post("/sign", (req, res) => {
    console.log(req.body);
    res.redirect("/thankyou");
});

app.listen(8080, () => console.log("SERVER ONLINE"));
