const fs = require('fs');

fs.readdir('./data/art/',(err,files)=>{
    if(err){
        console.log(err)
    } else {
        for (var i=0; i<files.length; i++){
            var fileList = 
            fileList = fileList + '<li>'+files[i]+'</li>'
            
      }
    }
})

fs.writeFile('./data/fileName','test','utf8', (err)=>{
    console.log(err)
})
