const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/basketballList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('basketball', {
            postList: fileList,
            subject:'basketball'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/basketballList',(err,data)=>{
        res.render('basketballList/'+data[req.params.id],{
            post:true,
            subject:'basketball',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/basketballList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'basketball',
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
        fs.renameSync(`views/basketballList/${req.body.id}.hbs`,`views/basketballList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/basketballList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/basketballLIst',(err,data)=>{
            res.render(`basketballList/${req.body.title}`,{
            post:true,
            subject:'basketball',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/basketballList/',(err,files)=>{
        fs.unlink('views/basketballList/'+files[id],(err)=>{
            res.redirect('/basketball')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/basketballList/',(err,files)=>{
        fs.readFile('./views/basketballList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'basketball',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}