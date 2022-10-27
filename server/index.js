const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const port = 3001;


const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "logindetails"
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("Not Authenticated");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "Failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

app.post('/register', (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)", 
            [email, hash], 
            (err, result) => {
                console.log(err);
            }
        );
    });  
});

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("Authenticed");
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post('/login', (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?;", 
        email, 
        (err, result) => {
            if (err) {
                res.send({ err:err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        const id = result[0].id;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        });
                        req.session.user = result;

                        res.json({auth: true, token: token, result: result});
                    } else {
                        res.json({auth: false, message: "Wrong Username/Password"});
                        
                    }
                });
            } else {
                res.json({ auth: false, message: "No user exists" });
            }
    });
})

app.listen(port, () => {
    console.log("Running server on port 3001");
});