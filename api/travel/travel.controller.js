const fs = require('fs')

exports.index = (req,res) => {
    fs.readdir('./views/travelList/',(err,files)=>{
        fileList = []
        for (var i=0; i<files.length; i++){
            file = files[i]
            file = file.split('.')
            fileList[i] = file[0]
        }
        res.render('travel', {
            postList: fileList,
            subject: 'travel'
        })
    })
}

exports.show = (req,res) => {
    fs.readdir('./views/travelList',(err,data)=>{
        res.render('travelList/'+data[req.params.id],{
            post:true,
            subject:'travel',
            index:req.params.id
        })
    })
}

exports.create = (req,res) => {
    fs.readdir('./views/travelList',(err,files)=>{
        files = files.length
        res.render('new',{
            write:true,
            subject:'travel',
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
        fs.renameSync(`views/travelList/${req.body.id}.hbs`,`views/travelList/${req.body.title}.hbs`)
    }
    // else if(req.body.title)
    fs.writeFile(`views/travelList/${req.body.title}.hbs`,req.body.description,'utf8',()=>{
        fs.readdir('views/travelLIst',(err,data)=>{
            res.render(`travelList/${req.body.title}`,{
            post:true,
            subject:'travel',
            index:req.params.id,
            })
        })
    })
}

exports.destroy = (req,res) => {
    id=req.params.id
    fs.readdir('views/travelList/',(err,files)=>{
        fs.unlink('views/travelList/'+files[id],(err)=>{
            res.redirect('/travel')
        })
    })
}

exports.getEditView = (req,res) => {
    fs.readdir('./views/travelList/',(err,files)=>{
        fs.readFile('./views/travelList/'+files[req.params.id],'utf8',(err,description)=>{
            file = files[req.params.id].split('.')
            res.render('edit',{
                write:true,
                subject:'travel',
                title:file[0],
                description:description,
                id:req.params.id
            })
        })
    })
}