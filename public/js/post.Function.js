const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid')

exports.checkHost = (username) => {
    var posts = db.get('posts').value()
    var i = 0;
    if(username == false) {
        while(i<posts.length){
            db.get('posts').find({host:true}).assign({host:false}).write()
            i = i+1;
        }
    } else {
        while(i<posts.length){
            var target = db.get(`posts`).find({author:username,host:false}).value()
            db.get(`posts`).find({author:username,host:false}).assign({host:true}).write()
            i = i+1;
        }
    }
}

exports.getHostAuthor = (req,callback)=>{
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
        this.checkHost(username)
    } else {
        var username = false;
        this.checkHost(username)
    }
    callback(loginedUser,username)
}

exports.getUserInfo = (req,callback)=>{
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
    } else {
        var username = false;
    }
    callback(loginedUser,username)
}

exports.getPost = (req,callback) => {
    var posts = db.get('posts')
    .value()
    callback(posts)
}

exports.addPost = (req) => {
    db.get('posts')
    .push(
        {   author: req.body.author, 
            title: req.body.title, 
            description:req.body.description,
            subject:req.body.subject,
            id:shortid.generate(),
            host:false
        }
        )
    .write();   
}


exports.updatePost = (req) => {
    db.get('posts')
    .find({ title: req.body.id })
    .assign({ title: req.body.title, description: req.body.description})
    .write()
}  

exports.removePost = (req) => {
    var sid = db.get(`posts[${req.params.id}].id`).value()
    db.get('posts')
    .remove({id:sid})
    .write()
}