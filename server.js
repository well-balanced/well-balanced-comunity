// const http = require('http');
// const fs = require('fs');


// const server = http.createServer((request,response)=>{
//     if (request.url === '/') {
//         fs.readFile('./static/template/index.html','utf-8', (err,data)=>{
//             response.writeHead(200, {
//                 'Content-Type':'text/html'
//             })
//             response.write(data);
//             response.end();
//         })
//     }
// })

// server.listen(3000);

const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');

app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}));

app.set('view engine', 'hbs');
app.use((req,res,next)=>{
    //config
    next()
})

app.use(express.static(__dirname+'/public')); // 현재경로+public 폴더 안에 있는 static 파일을 불러옴


app.get('/', (req, res)=>{
    res.render('index',{
        index: true,
    })
})

app.get('/art.hbs', (req, res)=>{
    res.render('art', {
        art: true
    })
})

app.get('/loginForm.hbs', (req, res)=>{
    res.render('loginForm')
})

app.get('/art.hbs', (req, res)=>{
    res.render('art', {
        art: true
    })
})

app.get('/music.hbs', (req, res)=>{
    res.render('music', {
        music: true
    })
})

app.get('/football.hbs', (req, res)=>{
    res.render('football', {
        football: true
    })
})

app.get('/basketball.hbs', (req, res)=>{
    res.render('basketball', {
        basketball: true
    })
})

app.get('/training.hbs', (req, res)=>{
    res.render('training', {
        training: true
    })
})

app.get('/ridingBike.hbs', (req, res)=>{
    res.render('ridingBike', {
        ridingBike: true
    })
})

app.get('/pet.hbs', (req, res)=>{
    res.render('pet', {
        pet: true
    })
})

app.get('/english.hbs', (req, res)=>{
    res.render('english', {
        english: true
    })
})

app.get('/travel.hbs', (req, res)=>{
    res.render('travel.hbs', {
        travel: true
    })
})

app.listen(3000,()=> {
    console.log('The server is running on Port 3000')
})