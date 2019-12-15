const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const userFunc = require('./public/js/user.Function');

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
// app.use('/music', require('./api/music/index'));
// app.use('/football', require('./api/football/index'));
// app.use('/basketball', require('./api/basketball/index'));
// app.use('/training', require('./api/training/index'));
// app.use('/ridingBike', require('./api/ridingBike/index'));
// app.use('/pet', require('./api/pet/index'));
// app.use('/english', require('./api/english/index'));
// app.use('/travel', require('./api/travel/index'));

app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}));
app.set('view engine', 'hbs');



app.get('/', (req, res)=>{
    if(req.user){
        var loginedUser = true;
        var username = req.user.username;
    }
    res.render('index',{
        index: true,
        loginedUser: loginedUser,
        username: username
    })
})


app.get('/login', (req, res)=>{
    res.render('loginForm', {
    })
})

app.get('/logout',async(req,res)=>{
    db.get('posts').find({'author': req.user.username}).assign({host:false}).write()
    req.session.destroy((err)=>{
        res.clearCookie()
        res.redirect('/');
    })
})


app.post('/login',(req,res,next)=>{
if(req.body.fullname){
    userFunc.addUser(req,(user)=>{
    })
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
    function(email, password, done) {
        userFunc.getUser(email,(user)=>{
            if(!user){
                return done(null,false,{message:'Incorrect E-mail or Password.'})
            }
            else if(email==user.email && password==user.password){
                return done(null,user);
            }
            return done(null,false,{message:'Incorrect E-mail or Password.'})
        });
    }
));


passport.serializeUser(function(user, done) {
    done(null,user)
  });
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});


app.listen(3000,()=> {
    console.log('The server is running on Port 3000')
})