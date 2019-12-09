const express = require('express'); 
const app = express();
const hbs = require('express-handlebars');
const qs = require('querystring');
const fs = require('fs')
const bodyParser = require('body-parser')
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
    {
      id: 1,
      name: 'alice'
    },
    {
      id: 2,
      name: 'bek'
    },
    {
      id: 3,
      name: 'chris'
    }
]

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
    console.log(req.params)
})

app.get('/art', (req, res)=>{
    fs.readdir('./views/artList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('art', {
            art: true,
            postList: fileList
        })
    })
})

app.get('/art/post', (req,res)=>{
    fs.readdir('./views/artList',(err,files)=>{
        files = files.length
        res.render('new',{
            id: files,
        })
    })
})

app.get('/art/:id', (req, res)=>{
    fs.readdir('views/artList/',(err,data)=>{
        res.render('artList/'+data[req.params.id],{
            postDetailOfArt:true,
            index:req.params.id
        })
    })
})


app.post('/art/:id', (req,res,next)=>{
    if(req.body.id){
        fs.renameSync(`views/artList/${req.body.id}.hbs`,`views/artList/${req.body.title}.hbs`)
    }
    fs.writeFile(`views/artList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/artLIst',(err,data)=>{
            res.render(`artList/${req.body.title}`,{
            postDetailOfArt:true,
            index:req.params.id,
            })
        })
    })
})

app.get('/delete/art/:id', (req,res,next)=>{
    console.log(req.body)
    id=req.params.id
    fs.readdir('views/artList/',(err,files)=>{
        fs.unlink('views/artList/'+files[id],(err)=>{
            res.redirect('/art')
        })
    })
})

// app.put('/art/:id',(req,res)=>{
//     console.log(req.body)
//     fs.renameSync(`views/artList/${req.body.id}.hbs`,`views/artList/${req.body.title}.hbs`)
//     fs.writeFile(`views/artList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
//             res.render(`artList/${req.body.title}`,{
//             postDetailOfArt:true,
//             index:req.params.id,
//         })
//     })
// })


app.get('/art/edit/:id', (req,res)=>{
    fs.readdir('./views/artList/',(err,files)=>{
        fs.readFile('./views/artList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                title:file[0],
                description:description,
                id:req.params.id
            })
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