const express = require("express");
const bodyParser = require('body-parser');
const csurf = require('csurf');
var pg = require("pg");
const cookieSession = require('cookie-session');
const spicedPg = require('spiced-pg');

const app = express();

const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

var title = "Make spiced hoodies that are slightly lighter grey than the ones that are currently on offer, \n again"

app.use(cookieSession({
  secret: 'needs a link to a JSON file',
  maxAge: 1000 * 60 * 60 * 24
}));

// cookieSession({
//   name: req.body.name
// })

app.use(bodyParser.urlencoded({
  extended: false
}));

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
    res.render("register", {
        layout: "main",
        cause:{
          title: title
        },
        navItems: [{ name: "see who else has signed already", link: "/signatures" }]
    });
});

app.post("/", (req, res) => {
  console.log('helllo');
  console.log(req.body);
  console.log(req.session); //this is what is used with csurf
  console.log(cookieSession);
  res.redirect("/profile")
});

app.get("/profile", (req,res) => {
  res.render('profile', {
    layout: "main",
    cause: {
      title: title
    }
  })
})

app.listen(8080, () => console.log("online"));
