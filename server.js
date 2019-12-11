const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public')); // 현재경로+public 폴더 안에 있는 static 파일을 불러옴
app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store : new FileStore('./sessions')
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', require('./api/users/index'));
app.use('/art', require('./api/art/index'));
app.use('/music', require('./api/music/index'));
app.use('/football', require('./api/football/index'));
app.use('/basketball', require('./api/basketball/index'));
app.use('/training', require('./api/training/index'));
app.use('/ridingBike', require('./api/ridingBike/index'));
app.use('/pet', require('./api/pet/index'));
app.use('/english', require('./api/english/index'));
app.use('/travel', require('./api/travel/index'));

app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}));
app.set('view engine', 'hbs');

const getLoginStatus = (user)=>{
    if(user){
        return true;
    }
}
const getUserName = (name)=>{
    var username = name;
    return username
}
app.get('/', (req, res)=>{
    if(req.user){
        var loginedUser = getLoginStatus(req.user);
        var username = getUserName(req.user.username);
    }
    res.render('index',{
        index: true,
        loginedUser: loginedUser,
        username: username
    })
})

var users = [
    {
        fullname:'Woosik Kim',
        email: 'woosik',
        password:123,
        username: 'woosik'
    },
    {
        fullname:'Woosik Kim',
        email: 'cosmian',
        password:123,
        username: 'cosmian'
    }
]


app.get('/login', (req, res)=>{
    res.render('loginForm', {
    })
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/');
    })
})

app.post('/login',(req,res,next)=>{
if(req.body.fullname){
    var userInfo = {
        fullname : req.body.fullname,
        email : req.body.email,
        password : req.body.password,
        username : req.body.username
    }
    users.push(userInfo)
    console.log(users)
}
next()
},
  passport.authenticate('local', 
    { successRedirect: '/',
    failureRedirect: '/login' }));
passport.use(new LocalStrategy(
    {
        usernameField:'email',
    },
    function(username, password, done) {
        for(var i=0; i<users.length; i++){
            if(username==users[i].email && password==users[i].password){
                return done(null,users[i]);
            }
        }
        return done(null,false,{message:'Incorrect E-mail or Password.'})
    }
));

var test = (user,done)=>{
    for(var i=0; i<users.lenth; i++){
        if(user.email==users[i].email){
            return done(null, users[i].email);
        }
    }
}
passport.serializeUser(function(user, done) {
    done(null,user)
  });
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});


app.listen(3000,()=> {
    console.log('The server is running on Port 3000')
})