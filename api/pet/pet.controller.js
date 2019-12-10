const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/petList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('pet', {
            postList: fileList,
            subject: 'pet'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/petList',(err,data)=>{
        res.render('petList/'+data[req.params.id],{
            post:true,
            subject:'pet',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/petList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'pet',
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
        fs.renameSync(`views/petList/${req.body.id}.hbs`,`views/petList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/petList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/petLIst',(err,data)=>{
            res.render(`petList/${req.body.title}`,{
            post:true,
            subject:'pet',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/petList/',(err,files)=>{
        fs.unlink('views/petList/'+files[id],(err)=>{
            res.redirect('/pet')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/petList/',(err,files)=>{
        fs.readFile('./views/petList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'pet',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}