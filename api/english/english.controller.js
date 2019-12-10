const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/englishList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('english', {
            postList: fileList,
            subject: 'english',
            loginedUser: req.session.loginedUser,
            username: req.session.username
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/englishList',(err,data)=>{
        res.render('englishList/'+data[req.params.id],{
            post:true,
            subject:'english',
            index:req.params.id,
            loginedUser: req.session.loginedUser,
            username: req.session.username
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/englishList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'english',
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
        fs.renameSync(`views/englishList/${req.body.id}.hbs`,`views/englishList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/englishList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/englishLIst',(err,data)=>{
            res.render(`englishList/${req.body.title}`,{
            post:true,
            subject:'english',
            index:req.params.id,
            loginedUser: req.session.loginedUser,
            username: req.session.username
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/englishList/',(err,files)=>{
        fs.unlink('views/englishList/'+files[id],(err)=>{
            res.redirect('/english')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/englishList/',(err,files)=>{
        fs.readFile('./views/englishList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'english',
                title:file[0],
                description:description,
                id:req.params.id,
                loginedUser: req.session.loginedUser,
                username: req.session.username
            })
        })
    })
}