const fs = require('fs');
const session = require('express-session');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid');

const getUserInfo = (req,callback)=>{
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
    } else {
        var username = false;
    }
    callback(loginedUser,username)
}
exports.index = (req,res) => {
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
        console.log(username)
    } else {
        var username = false;
        console.log(username)
    }
    getPost(req,(posts)=>{
        checkHost(username);
        res.render('art', {
            posts : posts,
            subject: 'art',
            loginedUser: loginedUser,
            username: username,
        })
    })
}
const getPostList = (req,callback) => {
    var posts = db.get('posts')
    .map('title')
    .value();
    var descriptions = db.get('posts')
    .map('description')
    .value();
    var authors = db.get('posts')
    .map('author')
    .value();
    callback(posts,descriptions,authors)
}

exports.show = (req,res) => {
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
    } else {
        var username = false;
    }
    getPost(req,(post)=>{
        res.render('partials/postDetail',{
            post:true,
            subject:'art',
            index:req.params.id,
            loginedUser: loginedUser,
            username: username,
            title: post[req.params.id].title,
            description: post[req.params.id].description
        })
    })
}

exports.create = (req,res) => {
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
    } else {
        var username = false;
    }
    var postSize = db.get('posts').size().value()
    res.render('new',{
        write:true,
        subject:'art',
        id: postSize,
        loginedUser: loginedUser,
        username: username,
    })
}
const getPost = (req,callback) => {
    var posts = db.get('posts')
    .value()
    callback(posts)
}
const addPost = (req) => {
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
const checkHost = (username) => {
    if(username){
        db.get('posts').find({'author': username}).assign({host:true}).write()
    }
    // for(var i=0; i<posts.lenth; i++) {
    //     if(username==posts[i].author){
    //         db.get('posts').find({'host': true}).assign({host:false}).write()
    //     }
    // }
}
const updatePost = (req) => {
    db.get('posts')
    .find({ title: req.body.id })
    .assign({ title: req.body.title, description: req.body.description})
    .write()
}  

const removePost = (req) => {
    var sid = db.get(`posts[${req.params.id}].id`).value()
    db.get('posts')
    .remove({id:sid})
    .write()
}

  exports.update = (req,res) => {
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
    } else {
        var username = false;
    }
    if(req.body.id){
        updatePost(req); 
    } else {
        addPost(req);
    }
    res.render('./partials/postDetail',{
        post:true,
        subject:'art',
        index:req.params.id,
        loginedUser: loginedUser,
        username: username,
        title:req.body.title,
        description:req.body.description
    })
}

exports.destroy = (req,res) => {
    removePost(req);
    res.redirect('/art');
}


exports.getEditView = (req,res) => {
    if (req.user){
        var loginedUser = true;
        var username = req.user.username;
    } else {
        var username = false;
    }
    getPost(req,(posts)=> {
        var post = posts[req.params.id];
        res.render('edit',{
            write:true,
            subject:'art',
            title:post.title,
            description:post.description,
            id:req.params.id,
            loginedUser: loginedUser,
            username: username
        })
    })
}