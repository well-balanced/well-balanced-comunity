const express = require('express'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const userFunc = require('../../public/js/user.Function');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('loginForm', {
    });
});

router.get('/logout',async(req,res) => {
    db.get('posts').find({
        'author': req.user.username
    }).assign({
        host: false
    }).write();
    req.session.destroy((err)=>{
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});


router.post('/login',(req,res,next)=>{
if(req.body.fullname) {
    userFunc.addUser(req);
}
next();
},
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/auth/login' 
}));

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    (email, password, done) => {
        userFunc.getUser(email,(user) => {
            if(!user) {
                return done(null,false,{
                    message: 'Incorrect E-mail or Password.'
                });
            }
            else if(email==user.email && password==user.password) {
                return done(null,user);
            }
            return done(null,false,{
                message: 'Incorrect E-mail or Password.'
            });
        });
    }
));


passport.serializeUser((user, done) => {
    done(null,user);
});
  
passport.deserializeUser((id, done) => {
    done(null, id);
});

module.exports = router;