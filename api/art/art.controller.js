const fs = require('fs')

exports.index = (req,res) => {
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
}

exports.show = (req,res) => {
    fs.readdir('./views/artList',(err,data)=>{
        res.render('artList/'+data[req.params.id],{
            postDetailOfArt:true,
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/artList',(err,files)=>{
        files = files.length
        res.render('new',{
            id: files,
        })
    })
}

exports.update = (req,res) => {
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
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}