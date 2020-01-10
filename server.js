const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store : new FileStore('./sessions')
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./api/auth/index'));
app.use('/art', require('./api/art/index'));
// app.use('/music', require('./api/music/index'));
// app.use('/football', require('./api/football/index'));
// app.use('/basketball', require('./api/basketball/index'));
// app.use('/training', require('./api/training/index'));
// app.use('/ridingBike', require('./api/ridingBike/index'));
// app.use('/pet', require('./api/pet/index'));
// app.use('/english', require('./api/english/index'));
// app.use('/travel', require('./api/travel/index'));

app.engine('hbs',hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    if(req.user){
        var loginedUser = true;
        var username = req.user.username;
    }
    res.render('index',{
        index: true,
        loginedUser,
        username
    });
});

app.listen(3000,() => {
    console.log('The server is running on Port 3000')
});