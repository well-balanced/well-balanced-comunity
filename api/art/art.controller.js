const fs = require('fs');
const session = require('express-session');


exports.index = (req,res) => {
    fs.readdir('./views/artList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('art', {
            postList: fileList,
            subject: 'art',
            loginedUser: req.session.loginedUser,
            username: req.session.username
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/artList',(err,data)=>{
        res.render('artList/'+data[req.params.id],{
            post:true,
            subject:'art',
            index:req.params.id,
            loginedUser: req.session.loginedUser,
            username: req.session.username
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/artList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'art',
            id: files,
            loginedUser: req.session.loginedUser,
            username: req.session.username
        })
    })
}

exports.update = (req,res) => {
    var special_pattern = /[`~!.@#$%^&*|\\\'\";:\/?]/gi;
    if(special_pattern.test(req.body.title)==true){
        return res.status(400).send('제목에 특수문자 ㄴㄴ')
    }
    if(req.body.id){
        fs.renameSync(`views/artList/${req.body.id}.hbs`,`views/artList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/artList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/artLIst',(err,data)=>{
            res.render(`artList/${req.body.title}`,{
            post:true,
            subject:'art',
            index:req.params.id,
            loginedUser: req.session.loginedUser,
            username: req.session.username
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/artList/',(err,files)=>{
        fs.unlink('views/artList/'+files[id],(err)=>{
            res.redirect('/art')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/artList/',(err,files)=>{
        fs.readFile('./views/artList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'art',
                title:file[0],
                description:description,
                id:req.params.id,
                loginedUser: req.session.loginedUser,
                username: req.session.username
            })
        })
    })
}