const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/trainingList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('training', {
            postList: fileList,
            subject: 'training'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/trainingList',(err,data)=>{
        res.render('trainingList/'+data[req.params.id],{
            post:true,
            subject:'training',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/trainingList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'training',
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
        fs.renameSync(`views/trainingList/${req.body.id}.hbs`,`views/trainingList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/trainingList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/trainingLIst',(err,data)=>{
            res.render(`trainingList/${req.body.title}`,{
            post:true,
            subject:'training',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/trainingList/',(err,files)=>{
        fs.unlink('views/trainingList/'+files[id],(err)=>{
            res.redirect('/training')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/trainingList/',(err,files)=>{
        fs.readFile('./views/trainingList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'training',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}