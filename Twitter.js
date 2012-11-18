var http = require("http");

var Twitter = function Twitter(searchTerms, dataCallback, endCallback) {
    this.dataCallback = dataCallback;
    this.endCallback = endCallback;
    this.searchTerms = searchTerms;
}

Twitter.prototype.searchTweets = function() {
    var that = this;
    http.get("http://search.twitter.com/search.json?q="+this.searchTerms, function(response){
        response.setEncoding('utf8');
        response.on('data',that .dataCallback);
        response.on('error', function(e) {
            console.log("Got error: " + e.message);
        });
        response.on("end", that.endCallback);
    });
};

exports.Twitter = Twitter;
