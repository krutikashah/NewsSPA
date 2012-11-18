var Twitter = require("./Twitter.js").Twitter;
var fs = require('fs');

var Controller = {
    index : function(req, res) {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var readStream = fs.createReadStream("./index.html");
        readStream.on('data', function(data) {
            res.write(data);
        });

        readStream.on('end', function() {
            res.end();
        });

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

    }
};

exports.Controller = Controller;