var Twitter = require("./Twitter.js").Twitter;
var fs = require('fs');
var url = require("url");


var Controller = {

    index : function(req, res) {
        serveFile(req, res, "index.html");
    },

    search :  function(req, res) {
        var dataCallback = function(data) {
            res.write(data);
        };

        var endCallback = function() {
            res.end();
        };

        var twitterApi = new Twitter(require("url").parse(req.url, true).query.term, dataCallback, endCallback);
        twitterApi.searchTweets();
    },

    error : function(req, res) {
        res.writeHead(404);
        res.end("Page not found");

    },

    public: function(req, res) {

        var reqUrl = url.parse(req.url, true);

        reqUrl = reqUrl.pathname.substr(1);

        var filePath = reqUrl.split('/');
        serveFile(req, res, filePath[1]);
    }
};

/**
 * Figure out if the file exists in the files system (under /public folder)
 * if it does, then choose the correct content-type (look at the file extension)
 * if it doesn't , give back a 404 response
 * @param req
 * @param res
 * @param filePath
 */
var serveFile = function(req, res, filePath) {
    //TODO: check for errors (file doesn't exist)

    var fileExtension = filePath.split('.')[filePath.split('.').length-1];
    var contentType;

    if (fileExtension == "js") {
        contentType = "text/javascript";
    } else if (fileExtension == "html") {
        contentType = "text/html";
    }

    res.writeHead(200, {
        'content-type': contentType
    });
    var readStream = fs.createReadStream("./public/"+filePath);
    readStream.on('data', function(data) {
        res.write(data);
    });

    readStream.on('end', function() {
        res.end();
    });
}

exports.Controller = Controller;