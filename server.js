const express = require("express");
const bodyParser = require('body-parser');
const csurf = require('csurf');
const cookieSession = require('cookie-session');
const secret = require('./secret.json');
//const db = require('./db.js')
const app = express();
const hb = require("express-handlebars");
const bcrypt = require("bcryptjs");

//console.log(bcrypt);

app.engine("handlebars", hb());
app.set("view engine", "handlebars");
var title = "Make SPICED hoodies that are slightly lighter grey than the ones that are currently on offer, \n again";

//console.log(db.selectAll);

app.use(cookieSession({
  secret: `${secret.secret}`,
  maxAge: 1000 * 60 * 60 * 24
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(csurf());

app.use(function(req,res,next) {
  res.locals.csrfToken = req.csrfToken();
  //console.log(req.csrfToken());
  console.log('loggerin',res.locals.csrfToken);
  next();
})

app.use(express.static(__dirname + "/public"));

app.get("/thankyou", (req, res) => {
    res.render("thankyou", {
        layout: "main",
        cause:{
          title: title
        },
        amount: 7,
        navItems: [
            { name: "petition page", link: "/" },
            { name: "see who else has signed", link: "/signatures" }
        ]
    });
});

app.get("/login", (req,res) => {
  res.render("login", {
    layout: "main"
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
})

//app.use(csurf());

app.get("/", (req, res) => {
  //console.log(db.selectAll);
    res.render("register", {
        layout: "main",
        cause: {
          title: title
        },
        csrfToken: req.csrfToken,
        navItems: [{ name: "see who else has signed already", link: "/signatures" }]
    });
});

app.post("/", (req, res) => {
  //console.log('hello');
  console.log(req.csrfToken);
  console.log(req.body.signInput);
  //spicedPg.createUser(req.body.firstName,req.body.lastName,req.body.email,req.body.password,req.body.signInput)
  // console.log(req.body);
  // console.log(req.session); //this is what is used with csurf
  res.redirect("/profile");
});

app.get("/profile", (req,res) => {
  res.render('profile', {
    layout: "main",
    cause: {
      title: title
    },
    csrfToken: req.csrfToken
  });
});

app.get("/profile/edit", (req,res) => {
  res.render('edit', {
    navItems: [
      {name: 'See your fellow supporters',
      link: "/signatures"}
    ],
    layout: "main",
    cause: '',
    csrfToken: req.csrfToken
  });
});

app.post("/profile", (req,res) => {
  console.log(res.body);
  res
});

app.listen(8080, () => console.log("online"));
