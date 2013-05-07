var http = require("http");
var url = require("url");
var controller = require("./Controller.js").Controller;

var server = http.createServer(function(req, res) {

    res.writeHead(200, { 'content-type': 'text/plain'});

    var reqUrl = url.parse(req.url, true);

    var pathname = reqUrl.pathname;

    if (pathname == "/") {
        pathname = "index";
    } else {
        pathname = pathname.substr(1);
        var a = pathname.split('/');
        pathname = a[0];
    }

    if (controller.hasOwnProperty(pathname)) {
        controller[pathname](req, res);
    } else {
        controller["error"](req, res);
    }
}).on('error', function(e) {
  console.log("Got error: " + e.message);
}).listen(8888);


