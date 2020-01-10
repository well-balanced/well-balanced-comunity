const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const userFunc = require('./public/js/user.Function');
const router = express.Router();

app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/loginForm', (req, res)=>{
    res.render('loginForm', {
    })
})