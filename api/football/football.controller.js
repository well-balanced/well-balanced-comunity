const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/footballList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('football', {
            postList: fileList,
            subject: 'football'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/footballList',(err,data)=>{
        res.render('footballList/'+data[req.params.id],{
            post:true,
            subject:'football',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/footballList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'football',
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
        fs.renameSync(`views/footballList/${req.body.id}.hbs`,`views/footballList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/footballList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/footballLIst',(err,data)=>{
            res.render(`footballList/${req.body.title}`,{
            post:true,
            subject:'football',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/footballList/',(err,files)=>{
        fs.unlink('views/footballList/'+files[id],(err)=>{
            res.redirect('/football')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/footballList/',(err,files)=>{
        fs.readFile('./views/footballList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'football',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}