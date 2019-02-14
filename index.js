const express = require("express");
const app = express();

const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("petition", {
        layout: "main",
        navItems: [{ name: "see who else has signed already", link: "#" }]
    });
});

app.post("/", (req, res) => {
    console.log(req);
});

app.get("/thankyou", (req, res) => {
    res.render("thankyou", {
        layout: "main",
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
