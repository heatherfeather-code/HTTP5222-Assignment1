const express = require("express");
const path = require("path"); //needed when setting up a static file
const cors = require('cors');


const sessions = require ("express-session");

const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

//set up express app
const app = express();
const port = process.env.PORT || "6004";

app.use(cors());

const dbName = 'portfoliodb';

//set up application template engine
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "pug");


app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//set up app for use sessions
app.use(
    sessions({
        secret: process.env.SESSIONSECRET,
        name:"MyUniqueSessID",
        saveUninitialized: false,
        resave: false,
        cookie: {}
    })
);

//USE PAGE ROUTES FROM ROUTER(S)
app.use("/", require("./components/Portfolio/routes"));
app.use("/user", require("./components/User/routes"));


app.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`);
});