var http = require("http");
var url = require("url");
var twitter = require("./Twitter.js")


var server = http.createServer(function(req, res) {
    var dataCallback = function(data) {
        res.write(data);
    };

    var endCallback = function() {
        res.end();
    };

    res.writeHead(200, { 'content-type': 'text/plain'});

    var reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == "/search") {

        var twitterApi = new twitter.Twitter(reqUrl.query.term, dataCallback, endCallback);
        twitterApi.searchTweets();
	}

}).on('error', function(e) {
  console.log("Got error: " + e.message);
}).listen(8888);


