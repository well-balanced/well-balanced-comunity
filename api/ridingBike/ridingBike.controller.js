const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/ridingBikeList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('ridingBike', {
            postList: fileList,
            subject: 'ridingBike'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/ridingBikeList',(err,data)=>{
        res.render('ridingBikeList/'+data[req.params.id],{
            post:true,
            subject:'ridingBike',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/ridingBikeList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'ridingBike',
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
        fs.renameSync(`views/ridingBikeList/${req.body.id}.hbs`,`views/ridingBikeList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/ridingBikeList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/ridingBikeLIst',(err,data)=>{
            res.render(`ridingBikeList/${req.body.title}`,{
            post:true,
            subject:'ridingBike',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/ridingBikeList/',(err,files)=>{
        fs.unlink('views/ridingBikeList/'+files[id],(err)=>{
            res.redirect('/ridingBike')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/ridingBikeList/',(err,files)=>{
        fs.readFile('./views/ridingBikeList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'ridingBike',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}