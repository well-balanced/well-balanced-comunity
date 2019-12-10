const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public')); // 현재경로+public 폴더 안에 있는 static 파일을 불러옴
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
    })
})

app.get('/loginForm', (req, res)=>{
    res.render('loginForm', {
    })
})


app.get('/music', (req, res)=>{
    res.render('music', {
        music: true
    })
})

app.get('/football', (req, res)=>{
    res.render('football', {
        football: true
    })
})

app.get('/basketball', (req, res)=>{
    res.render('basketball', {
        basketball: true
    })
})

app.get('/training', (req, res)=>{
    res.render('training', {
        training: true
    })
})

app.get('/ridingBike', (req, res)=>{
    res.render('ridingBike', {
        ridingBike: true
    })
})

app.get('/pet', (req, res)=>{
    res.render('pet', {
        pet: true
    })
})

app.get('/english', (req, res)=>{
    res.render('english', {
        english: true
    })
})

app.get('/travel', (req, res)=>{
    res.render('travel', {
        travel: true
    })
})

app.listen(3000,()=> {
    console.log('The server is running on Port 3000')
})