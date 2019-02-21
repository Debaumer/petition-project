const express = require("express");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const secret = require("./secret.json");
//const db = require('./db.js')
const app = express();
const hb = require("express-handlebars");
const pg = require("pg");
const bcrypt = require("bcryptjs");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

function credSetter(target, email, password) {}

var title =
    "Make SPICED hoodies that are slightly lighter grey than the ones that are currently on offer, \n again";

app.use(
    cookieSession({
        name: "session",
        secret: `${secret.cookieSecret}`,
        maxAge: 1000 * 60 * 2
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
    res.render("thankyou", {
        layout: "main",
        cause: {
            title: title
        },
        error: true,
        amount: {},
        navItems: [
            { name: "petition page", link: "/" },
            { name: "see who else has signed", link: "/signatures" }
        ]
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main"
    });
});

app.post("/logout", (req, res) => {
    req.session = null;
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
    console.log("pre-setting", req.session);
    console.log("post-setting", req.session);
    res.redirect("/profile");
});

app.get("/profile", (req, res) => {
    if (!req.session.isLoggedIn) {
        console.log("ahhh");
        res.redirect("/");
    } else {
        res.render("profile", {
            layout: "main",
            cause: {
                title: title
            },
            csrfToken: req.csrfToken
        });
    }
});

app.get("/profile/edit", (req, res) => {
    res.render("edit", {
        navItems: [{ name: "See your fellow supporters", link: "/signatures" }],
        layout: "main",
        cause: "",
        csrfToken: req.csrfToken
    });
});

app.get("/create", (req, res) => {
    res.render("maker/create", {});
});

app.post("/create", (req, res) => {
    console.log(req);
    res.redirect("/create/step1");
});

app.post("/profile", (req, res) => {
    console.log(req.body);
});

app.listen(8080, () => console.log("online"));
