require("dotenv").config();
var logText = require("./log.js")
var axios = require("axios")
var moment = require("moment")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var venueSearchResults = []

var command = process.argv[2];
var searchText = process.argv.splice(3).join("+");

function findConcert(){
    if(searchText == ""){
        searchText = "tool";
    }

    queryURL = "https://rest.bandsintown.com/artists/" + searchText + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(results) {
        if (results.data.length != 0){
            headerString = "Events for: " + results.data[0].artist.name
            venueSearchResults.push(headerString);

            results.data.forEach(element => {
            venueInfoArray = [
                "Venue Name: " + element.venue.name,
                "Location: " + element.venue.city + ", " + element.venue.region,
                "Date of Event: " + moment(element.datetime).format('MMMM Do YYYY, h:mm:ss a'),
                "--------------------------------------------------------------",
            ];
            venueInfoString = venueInfoArray.join("\n");
            console.log(venueInfoString);
            venueSearchResults.push("\n" + venueInfoString);
            });
            logText("\n>\n"+venueSearchResults.join(" "));
        }

        else{
            console.log("Artist " + searchText + " was not found, please try someone else");
        };
    });
};

function findMovie(){

    if (searchText == ""){
        searchText = "Mr.Nobody";
    }

    queryURL = "http://www.omdbapi.com/?apikey=trilogy&t="+searchText
    axios.get(queryURL).then(function(results){

        if(results.data.length != 0){

            movieInfoArray = [
                "Movie Title: " +results.data.Title,
                "Release Year: " +results.data.Year,
                "IMDB Rating: " +results.data.imdbRating,
                "Rotten Tomatoes Rating: " +results.data.Ratings[1].value,
                "Country of Production: " +results.data.Country,
                "Language of Movie: " +results.data.Language,
                "Movie Plot: " +results.data.Plot,
                "Actors: " +results.data.Actors,
                "------------------------------------------------------------------"
        ];
        movieInfoStr = movieInfoArray.join("\n");
        console.log(movieInfoStr);
        logText("\n>\n" + movieInfoStr);
        }
        else {
            console.log("Movie " + searchText + "was not found, please try a different movie")
        }
    });
};

function findSong(){
    if(searchText == ""){
        searchText = "The Sign"
    }

    spotify.search({ type: 'track', query: searchText, limit: 1 }, function(err, results) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        
        if(results.tracks.items.length != 0){
            songInfo = results.tracks.items[0];

            songInfoArray = [
                "Artist(s): " + songInfo.artists[0].name,
                "Song Name: " + songInfo.name,
                "Song URL: " + songInfo.external_urls.spotify,
                "Album Name: " + songInfo.album.name,
                "-------------------------------------------------------------------------------------"
            ];
            songInfoStr = songInfoArray.join("\n");
            console.log(songInfoStr);
            logText("\n>\n" + songInfoStr);
        }
        else {
            console.log("Song " + searchText + " was not found, please try a different song")
        }
    });
};

function findTextFile(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) throw err;
        textArray = data.split(",");
        command = textArray[0].trim();
        searchText = textArray[1].trim().replace(/['"]+/g, '');
        runSwitch();
    });
};
function runSwitch(){
    switch (command) {
        case "concert-this":
            findConcert();
            break
        case "movie-this":
            findMovie();
            break
        case "spotify-this-song":
            findSong();
            break
        case "do-what-it-says":
            findTextFile();
            break
        default:
            console.log("please provide a valid command, see readme.md for help")
    };

};

runSwitch();