var fs = require("fs");

function logText(string){
    fs.appendFile("log.txt", string, function(err){
        if (err) throw err;
        console.log("search result saved in log file");
    });
};

module.exports = logText;