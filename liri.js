// require("dotenv").config();

var axios = require("axios")

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchText = process.argv.splice(3).join("+");

switch (command) {
    case "concert-this":
        queryURL = "https://rest.bandsintown.com/artists/" + searchText + "/events?app_id=codingbootcamp";
        axios.get(queryURL).then(function(results) {
            console.log(results);
        });
};

