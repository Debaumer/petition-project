//invoke query functions
const express = require("express");
const app = express();

const db = require("./db");

var hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlbars");

app.get("/getcities", (req, res) => {
    db.getAllCities()
        .then(results => {
            console.log(results);
        })
        .catch(err => {
            console.log("getAllCities: ", err);
        });
});

app.post("/createnewcity", (req, res) => {
    db.addCity("Berlin", "Berlin").then(() => {
        console.log("hello");
    });
});

app.listen(8080, () => console.log("RUNNING"));
