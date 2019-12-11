const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public')); // 현재경로+public 폴더 안에 있는 static 파일을 불러옴
app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store : new FileStore('./sessions')
}))
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


app.get('/', (req, res)=>{
    res.render('index',{
        index: true,
        loginedUser: req.session.loginedUser,
        username: req.session.username
    })
})

let users = [
    {
        email: 'woosik',
        password:123,
        username: 'woosik'
    },
    {
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
        res.redirect('/')
    })
})


app.post('/login', (req, res)=>{
    for (var i=0; i<users.length; i++){
        if(req.body.email == users[i].email && req.body.password == users[i].password){
            req.session.loginedUser = true;
            req.session.username = users[i].username;
            res.redirect('/');
        }
    }
    res.redirect('/login')
})


app.listen(3000,()=> {
    console.log('The server is running on Port 3000')
})