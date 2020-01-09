const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const postFunction = require('../../public/js/post.Function');

exports.index = (req,res) => {
    postFunction.getHostAuthor(req,(loginedUser,username) => {
        postFunction.getPost(req,(posts) => {
            res.render('art', {
                posts,
                subject: 'art',
                loginedUser,
                username,
            });
        });
    });
};

exports.show = (req,res) => {
    postFunction.getUserInfo(req,(loginedUser,username) => {
        postFunction.getPost(req,(post) => {
            res.render('partials/postDetail',{
                post: true,
                subject: 'art',
                index: req.params.id,
                loginedUser,
                username,
                title: post[req.params.id].title,
                description: post[req.params.id].description,
                host: post[req.params.id].host
            });
        });
    });
};

exports.create = (req,res) => {
    postFunction.getUserInfo(req,(loginedUser,username) => {
        var postSize = db.get('posts').size().value();
        res.render('new',{
            write: true,
            subject: 'art',
            id: postSize,
            loginedUser,
            username,
        })  ;    
    });
};

  exports.update = (req,res) => {
    postFunction.getUserInfo(req,(loginedUser,username) => {
        if(req.body.id) {
            postFunction.updatePost(req); 
        } else {
            postFunction.addPost(req);
        }
        res.render('./partials/postDetail',{
            post:true,
            subject:'art',
            index:req.params.id,
            loginedUser,
            username,
            title:req.body.title,
            description:req.body.description
        })        
    })
}

exports.destroy = (req,res) => {
    postFunction.removePost(req);
    res.redirect('/art');
};


exports.getEditView = (req,res) => {
    postFunction.getUserInfo(req,(loginedUser,username) => {
        postFunction.getPost(req,(posts) => {
            var post = posts[req.params.id];
            res.render('edit',{
                write:true,
                subject:'art',
                title:post.title,
                description:post.description,
                id:req.params.id,
                loginedUser,
                username
            });
        });
    });
};