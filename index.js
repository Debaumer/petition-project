const express = require("express");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieSession = require("cookie-session");

const db = require("./db.js");
const bcrypt = require("./bcrypt");

const app = express();

const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

var title = [
    "Diets",
    "Public Enemies",
    "International Boogeymen",
    "Brands promoting Social Issues",
    "Welfare Recipients"
];

app.use(
    cookieSession({
        secret: "you will have to speak up I'm wearing a towel",
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

function guardRoute(req, res, next) {
    console.log("GUARDROUTE RUNNING");
    if (!req.session.id) {
        console.log("req.session", req.session);
        console.log("routeGuarded");
        res.redirect("/");
    } else {
        console.log("GUARDROUTE STANDING DOWN");
        next();
    }
}

app.get("/", (req, res) => {
    if (req.session.id) {
        res.redirect("/signatures");
    } else {
        res.render("register", {
            layout: "main",
            cause: title,
            csrfToken: req.csrfToken,
            navItems: [
                { name: "see who else has signed already", link: "/signatures" }
            ]
        });
    }
});

app.post("/", (req, res) => {
    bcrypt
        .hashPw(req.body.password)
        .then(pw => {
            db.createUser(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                pw
            )
                .then(values => {
                    console.log("VALUES ROW", values);
                    db.loginCheck(req.body.email)
                        .then(data => {
                            req.session.id = data.rows[0].id;
                            console.log("user id", req.session.id);

                            req.session.firstName = req.body.firstName;
                            req.session.lastName = req.body.lastName;
                            req.session.email = req.body.email;
                            console.log("user id in session", req.session.id);
                            res.redirect("/profile");
                        })
                        .catch(err => {
                            console.log(err);
                        });

                    //console.log("values", values);
                })
                .catch(err => {
                    console.log("errr", err);
                    res.render("register", {
                        layout: "main",
                        error: err,
                        msg: err
                    });
                });
        })
        .catch(err => {
            console.log("ERROR:" + err);
        });
});

app.get("/profile", guardRoute, (req, res) => {
    //TODO:: redirect logged in users to /profile/edit
    res.render("profile", {
        layout: "main",
        nav: [
            {
                name: "logout",
                link: "/logout"
            }
        ],
        cause: {
            cause: title
        },
        csrfToken: req.csrfToken
    });
});

app.post("/profile", guardRoute, (req, res) => {
    console.log("req.session.id", req.session.id);
    db.createProfile(
        req.session.id,
        req.body.city,
        req.body.homepage,
        req.body.age
    )
        .then(results => {
            res.redirect("/sign");
        })
        .catch(err => {
            console.log("ERROR ", err);
        });
});

app.get("/profile/edit", guardRoute, (req, res) => {
    db.getProfile(req.session.id)
        .then(data => {
            var showData = data.rows[0];
            res.render("edit", {
                navItems: [
                    { name: "See your fellow supporters", link: "/signatures" },
                    { name: "logout", link: "/logout" }
                ],
                layout: "main",
                cause: title,
                email: showData.email,
                firstname: showData.firstname,
                lastname: showData.lastname,
                age: showData.age,
                city: showData.city,
                homepage: showData.homepage,
                signature: showData.signature,
                csrfToken: req.csrfToken
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/profile/edit", guardRoute, (req, res) => {
    db.updateUserInfo(
        req.session.id,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    )
        .then(data => {
            console.log("updateuserInfo", data);
            db.updateProfile(
                req.body.age,
                req.body.city,
                req.body.homepage,
                req.session.id
            )
                .then(data => {
                    console.log("updateProfile", data);
                    res.redirect("/profile/edit");
                })
                .catch(err => {
                    console.log("updateprofile error:", err);
                });
        })
        .catch(err => {
            console.log("updateuserinfo error:", err);
        });
});

app.get("/profile/signature", guardRoute, (req, res) => {
    db.getSig(req.session.id)
        .then(data => {
            res.render("sign", {
                layout: "main",
                cause: title,
                csrfToken: req.csrfToken
            });
        })
        .catch(err => {
            res.render("thankyou", {
                layout: "main",
                error: err
            });
        });
});

app.post("/profile/signature", guardRoute, (req, res) => {
    db.updateSignature(
        req.session.id,
        req.body.sigInput,
        req.body.firstName,
        req.body.lastName
    )
        .then(data => {
            console.log(data);
            res.redirect("/thankyou");
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/thankyou", guardRoute, (req, res) => {
    var count = db
        .getSignerCount()
        .then(data => {
            var count = data.rows[0].count;
            db.getSig(req.session.id)
                .then(data => {
                    res.render("thankyou", {
                        layout: "main",
                        cause: title,
                        nav: [
                            {
                                name: "Edit Your Details",
                                link: "/profile/edit"
                            }
                        ],
                        firstName: req.session.firstName,
                        amount: count,
                        supporter: [
                            {
                                signature: data.rows[0].signature
                            }
                        ]
                    });
                })
                .catch(err => {
                    res.render("thankyou", {
                        layout: "main",
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/login", (req, res) => {
    db.loginCheck(req.session.email)
        .then(data => {
            if (req.session.id == data.rows[0].id) {
                console.log("hit it");
                res.redirect("/thankyou");
            } else {
                //do nothing
            }
            //bcrypt.checkHashData();
        })
        .catch(err => {
            res.render("login", {
                layout: "main",
                cause: title
            });
        });
});

app.post("/login", (req, res) => {
    db.login(req.body.email)
        .then(data => {
            bcrypt
                .checkHashData(req.body.password, data.rows[0].password)
                .then(data => {
                    if (data === true) {
                        req.session.email = req.body.email;
                        db.loginCheck(req.session.email)
                            .then(data => {
                                req.session.id = data.rows[0].id;
                                res.redirect("/thankyou");
                            })
                            .catch(err => {
                                console.log("error", err);
                            });
                    } else if (data === false) {
                        res.render("login", {
                            layout: "main",
                            error: true,
                            msg: "Your email or password were incorrect"
                        });
                    }
                })
                .catch(err => {
                    console.log("ERROR", err);
                });
        })
        .catch(err => {
            console.log("err", err);
        });
});

app.get("/signatures", (req, res) => {
    var navbarItems = {};
    if (req.session.id) {
        console.log("user is logged in");
        navbarItems = [];
        //console.log(navbarItems);
    }
    var allsigs = db
        .getAllSigners(req.session.id)
        .then(data => {
            console.log(data.rows);
            return data.rows.map(item => {
                return {
                    sig: item.signature
                };
            });
        })
        .catch(err => {
            console.log(err);
        });

    db.getAllProfiles(req.session.id)
        .then(data => {
            //console.log(data.rows[0].city);
            const alldata = data.rows.map(item => {
                return {
                    firstName: item.firstname,
                    lastName: item.lastname,
                    city: item.city,
                    homepage: item.homepage,
                    age: item.age,
                    signature: item.signature
                };
            });

            res.render("totalSign", {
                layout: "main",
                cause: title,
                supporter: alldata,
                signatures: allsigs,
                navItems: [
                    { name: "Edit your details", link: "/profile/edit" },
                    { name: "See your signature", link: "/thankyou" },
                    {
                        name: "logout",
                        link: "/logout"
                    }
                ]
            });
        })
        .catch(err => {
            console.log("ERROR", err);
        });
});

app.get("/sign", guardRoute, (req, res) => {
    res.render("sign", {
        layout: "main",
        cause: title,
        csrfToken: req.csrfToken
    });
});

app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/");
});

app.post("/sign", guardRoute, (req, res) => {
    db.createSignature(
        req.session.id,
        req.body.sigInput,
        req.body.firstName,
        req.body.lastName
    )
        .then(data => {
            console.log(data);
            res.redirect("/thankyou");
        })
        .catch(err => {
            console.log("ERROR", err);
            res.render("sign", {
                layout: "main",
                error: err
            });
        });
});

app.get("/register", (req, res) => {
    res.redirect("/");
});

app.use(function(req, res, next) {
    res.status(404);
    res.send(
        "<h1>404 PAGE NOT FOUND</h1><br>this is probably <em>your</em> fault"
    );
});

app.listen(process.env.PORT || 8080, () => console.log("SERVER ONLINE"));
