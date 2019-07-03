require("dotenv").config();
const fs = require('fs')
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const sKeys = keys

const spotify = new Spotify(sKeys.spotify);
//process.argv
// console.log(process.argv)


var command = process.argv[2];
var input = process.argv.slice(3).join(' ');


if (command === 'spotify-this-song') {
    songs()
} if (command === "movie-this") {
    movies()
} if (command === 'concert-this') {
    bands()
} if (command === 'do-what-it-says') {
    readF()
}

function songs(songFromFile) {
    if (songFromFile) {
        input = songFromFile
    } else {
        input = input
    }
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //artist name, song name, spotify href,  album name//
        console.log('Artist Name:  ' + data.tracks.items[0].artists[0].name);
        console.log('Song Name:  ' + data.tracks.items[0].name);
        console.log('Spotify URL: ' + data.tracks.items[0].external_urls.spotify);
        console.log('Album Name: ' + data.tracks.items[0].album.name)
    });

}
function movies() {
    axios.get('https://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy')
        .then(function (response) {
            // handle success
            console.log('------------------------------------------------')
            console.log('Title of the movie is: ' + response.data.Title);
            console.log('The year the movie came out: ' + response.data.Year);
            console.log('The IMDB rating: ' + response.data.imdbRating);
            console.log('Rotten Tomatoes rating: ' + response.data.Ratings.Value);
            console.log('Country where the movie was produced: ' + response.data.Country);
            console.log('Langauge of the movie ' + response.data.Language);
            console.log('Plot of the movie ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
            console.log('------------------------------------------------')

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })


}
function bands() {
    axios.get('https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp')
        // Name of the venue
        // Venue location
        // Date of the Event(use moment to format this as "MM/DD/YYYY")
        .then(function (response) {
            // handle success
            console.log('-------------------------------------------------')
            console.log('Date of the event: ' + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log('Name of venue: ' + response.data[0].venue.name);
            console.log('Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country)
            console.log('-------------------------------------------------')
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}

function readF() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        if (dataArr[0] === 'spotify-this-song') {
            songs(dataArr[1])
        }

    });
}
