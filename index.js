const express = require("express");
const app = express();
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const csrf = require('csurf');

const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(cookieSession({
  secret: 'needs a link to a JSON file',
  maxAge: 1000 * 60 * 60 * 24 * 7 * 2
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(csrf());

app.use(function(req,res,next) {
  res.locals.csrfToken = req.csrfToken();
  next();
})



app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("petition", {
        layout: "main",
        cause:{
          title:"Make spiced hoodies that are slightly lighter grey than the ones that are currently on offer if that's ok \n again. I mean its ok if you don't I like the ones you have, the ones you have a fine. But I have this thing about it? Should I tell you? I guess not, anyway the grey ones, it would really help me make the decision, I usually take a long time to come to a decision on things,I tend to waffle along quite a bit, I hope your understand. OK I mean, while I've got you here I guess I can tell you. See when I was very young I had a black labrador named bluey, he was a good boy, but the thing is, she was actually a girl. I found out one day by complete chance, my parents knew but they never bothered to tell me, they thought it was funny. Anyway so I left to go to the milk bar, and I had a small plastic bag of collectors edition pogs in my back pocket, as was the style at the time. So I go there and I was wearing a grey jumper not unlike the one I want to buy. "
        },
        navItems: [{ name: "see who else has signed already", link: "/signatures" }]
    });
});

app.post("/", (req, res) => {
    console.log(req);
});

app.get("/thankyou", (req, res) => {
    res.render("thankyou", {
        layout: "main",
        cause:{
          title:"Make spiced hoodies that are slightly lighter grey than the ones that are currently on offer if that's ok \n again."
        },
        navItems: [
            { name: "petition page", link: "/" },
            { name: "see who else has signed", link: "#" }
        ]
    });
});

app.get("/signatures", (req, res) => {
    res.render("signatories", {
        layout: "main",
        navItems: [
            {
                name:
                    "sign up again with a different email to inflate our numbers!",
                link: "#"
            }
        ]
    });
});

app.listen(8080, () => console.log("online"));
