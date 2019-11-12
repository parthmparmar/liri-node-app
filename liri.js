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
            if (results.data.length == 0){
                console.log("No upcoming events for " + searchText);
                return
            };

            results.data.forEach(element => {
                console.log("Venue Name: " + element.venue.name);
                console.log("Location: " + element.venue.city + ", " + element.venue.region);
                console.log("Date of Event: " + element.datetime);
                console.log("--------------------------------------------------------------")
            });
        });
    case "movie-this":
        if (searchText == ""){
            searchText = "Mr.Nobody";
        }

        queryURL = "http://www.omdbapi.com/?apikey=trilogy&t="+searchText
        axios.get(queryURL).then(function(results){

            if(results.data.Title == "undefined"){
                console.log("movie name does not exist, please try again")
                return
            };
            console.log("Movie Title: " +results.data.Title);
            console.log("Release Year: " +results.data.Year);
            console.log("IMDB Rating: " +results.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " +results.data.Ratings[1].value);
            console.log("Country of Production: " +results.data.Country);
            console.log("Language of Movie: " +results.data.Language);
            console.log("Movie Plot: " +results.data.Plot);
            console.log("Actors: " +results.data.Actors);
            console.log("------------------------------------------------------------------")

        });
};

