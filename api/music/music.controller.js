const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/musicList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('music', {
            postList: fileList,
            subject: 'music'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/musicList',(err,data)=>{
        res.render('musicList/'+data[req.params.id],{
            post:true,
            subject:'music',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/musicList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'music',
            id: files,
        })
    })
}

exports.update = (req,res) => {
    var special_pattern = /[`~!.@#$%^&*|\\\'\";:\/?]/gi;
    if(special_pattern.test(req.body.title)==true){
        return res.status(400).send('제목에 특수문자 ㄴㄴ')
    }
    if(req.body.id){
        fs.renameSync(`views/musicList/${req.body.id}.hbs`,`views/musicList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/musicList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/musicLIst',(err,data)=>{
            res.render(`musicList/${req.body.title}`,{
            post:true,
            subject:'music',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/musicList/',(err,files)=>{
        fs.unlink('views/musicList/'+files[id],(err)=>{
            res.redirect('/music')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/musicList/',(err,files)=>{
        fs.readFile('./views/musicList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'music',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}