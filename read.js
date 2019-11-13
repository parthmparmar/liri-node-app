var fs = require("fs");

function readTextFile(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) throw err;
        textArray = data.split(",");
        command = textArray[0].trim();
        searchText = textArray[1].trim().replace(/['"]+/g, '');
        searchObj = {command, searchText};
        console.log(searchObj);
        return searchObj;
    });
};

module.exports = readTextFile;