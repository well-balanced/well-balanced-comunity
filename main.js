
var http = require('http');
var fs = require('fs');
var url = require('url');

function getTemplate(body,list) {
    return `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    <meta name="viewport" content="width=devide-width", initial-scale="1">
        <title>well-balanced</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/well-balanced.css">
    <script src="https://kit.fontawesome.com/8c88212ad2.js" crossorigin="anonymous"></script>
    </head>
    <body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="/">Home</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav mr-auto">
  <li class="nav-item">
    <a class="nav-link" href="/?id=art">Art</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/?id=music">Music</a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Sports
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" href="/?id=football">Football</a>
      <a class="dropdown-item" href="/?id=basketball">Basketball</a>
      <a class="dropdown-item" href="/?id=training">Training</a>
      <a class="dropdown-item" href="/?id=ridingBike">Riding Bike</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/?id=pet">Pet</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/?id=english">English</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/?id=travel">Travel</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"> Share life style each other</a>
  </li>
  <form class="form-inline my-2 my-lg-0">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
  
</ul>

<ul class="navbar-nav ml-auto">
<li class="nav-item">
    <a class="nav-link fas fa-lock fa-lg" href="loginForm.html">
    </a>
</li>
</ul>
</div>
</nav>
${body}
<!-- Footer -->
<footer class="page-footer font-small cyan darken-3">

<!-- Footer Elements -->
<div class="container">

<!-- Grid row-->
<div class="row">

  <!-- Grid column -->
  <div class="col-md-12 py-3" id="social">
    <div class="mb-1 text-center">

      <!-- Github -->
      <a class="git-ic">
        <i class="fab fa-github fa-lg white-text ml-md-auto mr-5 fa-2x"> </i>
      </a>
      <!-- Google +-->
      <a class="gplus-ic">
        <i class="fab fa-google-plus-g fa-lg white-text ml-md-auto mr-5 fa-2x"> </i>
      </a>
      <!--Linkedin -->
      <a class="li-ic">
        <i class="fab fa-linkedin-in fa-lg white-text ml-md-auto mr-5 fa-2x"> </i>
      </a>
    </div>
  </div>
  <!-- Grid column -->

</div>
<!-- Grid row-->

</div>
<!-- Footer Elements -->

<!-- Copyright -->
<div class="footer-copyright text-center py-3">© 2019 Copyright: Woosik Kim
</div>
<!-- Copyright -->

</footer>
<!-- Footer -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="js/bootstrap.js"></script>
    </body>
</html>
    `
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    console.log(pathname)
    if(pathname==='/'){
        if (queryData.id===undefined) {
            fs.readFile(`data/index`,'utf8',function(err,body){
                response.writeHead(200,{
                    'Content-Type':'text/html; charset=utf-8'
                })
                template = getTemplate(body)
                response.end(template)
            })
        }
         } else {
            fs.readFile(`data/${queryData.id}`,'utf8', function(err,body){
                if (body === undefined) {
                    response.writeHead(404);
                    response.end("Not Found")
                } else {
                    response.writeHead(200,{
                        'Content-Type':'text/html; charset=utf-8'
                    });
                    template = getTemplate(body)
                    response.end(template);
                }             
            })
        }
    } else{
        response.writeHead(404);
        response.end("Not Found")
    }
    
});
app.listen(3000);