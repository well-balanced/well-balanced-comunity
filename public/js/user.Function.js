const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

exports.getUser = (email,callback) => {
    var user = db.get('users')
    .find({"email":email})
    .value()
    callback(user)
}

exports.addUser = (req, callback) => {
    this.getUser(req.body.email,(user)=>{
        if(user){
            user = false;
            callback(user)
        } 
        else{
            db.get('users')
        .push({ 
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,
            username : req.body.username})
        .write()
        }
    })
}