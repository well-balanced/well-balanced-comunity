const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const qs = require('querystring');
const fs = require('fs')

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

app.get('/art', (req, res)=>{
    fs.readdir('./data/art/',(err,files)=>{
        if(err){
            console.log(err)
        } else {
            for (var i=0; i<files.length; i++){
                var fileList = ''
                file = files[i]
                fileList = fileList + `<li>${file}</li>`   
            }
            res.render('art', {
                art: true,
                postList:fileList
            })
        }
    })
})
app.get('/art/post', (req,res)=>{
    res.render('postArt')
})
app.post('/art/create_process', (req,res)=>{
    res.render('success')
    var body
    req.on('data',(data)=>{
        body = body + data;
    })
    req.on('end',()=>{
        var post = qs.parse(body);
        var description = post.description;
        var title = post.undefinedtitle;
        fs.writeFile(`./data/art/${title}`,description,'utf8', ()=>{
            
        })
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