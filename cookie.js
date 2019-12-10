var express = require('express');
var app = express();
var cookie = require('cookie');

app.get('/',(req,res)=>{
    var reqCookie
    if (req.headers.cookie!==undefined){
        reqCookie = cookie.parse(req.headers.cookie)
        console.log(reqCookie)
    }
    res.set({
        'Set-Cookie':[
            'yammy_cookie=choco',
            'tasty_cookie=strawberry',
            `permanent=cookies; Max-Age=${60*60*24*30}`
        ]
    })
    res.send('Cookie!!')
})

app.listen(3000)