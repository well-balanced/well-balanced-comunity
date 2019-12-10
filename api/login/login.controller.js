const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/loginForm', (req, res)=>{
    res.render('loginForm', {
    })
})