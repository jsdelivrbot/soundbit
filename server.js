

var billboard = require("billboard-top-100").getChart;
//var glob = require('glob')
//var jQuery = require('./html/libs/jquery/dist/jquery.js')
//global.jQuery = require('jquery');
//global.window = require('window');
//global.app = require('app');
//require("./html/scripts/*");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var port = process.env.PORT || 3000;

// const env = process.env.NODE_ENV || 'production';
var express = require('express')
var path = require("path")
var app = express()
app.use(express.static(__dirname + '/public'));


//glob.sync( './html/libs/**/dist/js/*.js' ).forEach( function( file ) {
/*  require( path.resolve( file ) );
});*/

// date defaults to saturday of this week
/*
billboard('hot-100', function(songs, err){
    if (err) console.log(err);
    console.log(songs); //prints array of top 100 songs
    console.log(songs[3]); //prints song with rank: 4
    console.log(songs[0].title); //prints title of top song
    console.log(songs[0].artist); //prints artist of top songs
    console.log(songs[0].rank) //prints rank of top song (1)
    console.log(songs[0].cover) //prints URL for Billboard cover image of top song
});

// date format YYYY-MM-DD

billboard('hot-100', '2016-08-27', function(songs, err){
    if (err) console.log(err);
    console.log(songs); //prints array of top 100 songs for week of August 27, 2016
    console.log(songs[3]); //prints song with rank: 4 for week of August 27, 2016
    console.log(songs[0].title); //prints title of top song for week of August 27, 2016
    console.log(songs[0].artist); //prints artist of top songs for week of August 27, 2016
    console.log(songs[0].rank) //prints rank of top song (1) for week of August 27, 2016
    console.log(songs[0].cover) //prints URL for Billboard cover image of top song for week of August 27, 2016
    return songs;
});

// 'all time' chart

billboard('greatest-billboard-200-albums', function(songs, err){
    if (err) console.log(err);
    console.log(songs); //prints array of top 200 albums
    console.log(songs[3]); //prints album with rank: 4
    console.log(songs[0].title); //prints title of top album
    console.log(songs[0].artist); //prints artist of top songs
    console.log(songs[0].rank) //prints rank of top album (1)
    console.log(songs[0].cover) //prints URL for Billboard cover image of top album
    return songs;
});

// list all available charts

var listCharts = require('billboard-top-100').listCharts;

listCharts(function(data){
    console.log(data['Overall Popularity']); //prints larray of charts in 'Overall Popularity' category
});
*/

// start the server


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/home.html'));
})

app.get('/search', function (req, res) {
  var finalReqString = '/public/searchresults.html';
  res.sendFile(path.join(__dirname+finalReqString));
})

app.get('/charts', function (req, res) {
  var finalReqString = '/public/chart.html';
  res.sendFile(path.join(__dirname+finalReqString));
})

app.get('/chartContent', function (req, res) {
  billboard('hot-100', function(songs, err){
      if (err) console.log(err);
      //console.log(songs); //prints array of top 100 songs
      //console.log(songs[3]); //prints song with rank: 4
      //console.log(songs[0].title); //prints title of top song
      //console.log(songs[0].artist); //prints artist of top songs
      //console.log(songs[0].rank) //prints rank of top song (1)
      //console.log(songs[0].cover) //prints URL for Billboard cover image of top song
      var myJSON = JSON.stringify(songs);
      res.send(myJSON);
  });
})

app.get('/discoverArtists', function (req, res) {

})

app.get('/discoverSongs', function (req, res) {

})

app.get('/searchInfo', function (req, res) {
  var keyword = req.query.keyword;
  console.log(keyword);
/*
  // get top 4 artists related to keyword
  var artist1_name;
  var artist1_image;
  var artist2_name;
  var artist2_image;
  var artist3_name;
  var artist3_image;
  var artist4_name;
  var artist4_image;

  // get top 4 albums related to keyword
  var album1_name;
  var album1_image;
  var album1_artist;
  var album2_name;
  var album2_image;
  var album2_artist;
  var album3_name;
  var album3_image;
  var album3_artist;
  var album4_name;
  var album4_image;
  var album4_artist;
*/
  // get top 10 songs related to keyword

  var song1_name;
  var song1_artist;
  var song1_album;
  var song1_image;
  var song2_name;
  var song2_artist;
  var song2_album;
  var song2_image;
  var song3_name;
  var song3_artist;
  var song3_album;
  var song3_image;
  var song4_name;
  var song4_artist;
  var song4_album;
  var song4_image;
  var song5_name;
  var song5_artist;
  var song5_album;
  var song5_image;
  var song6_name;
  var song6_artist;
  var song6_album;
  var song6_image;
  var song7_name;
  var song7_artist;
  var song7_album;
  var song7_image;
  var song8_name;
  var song8_artist;
  var song8_album;
  var song8_image;
  var song9_name;
  var song9_artist;
  var song9_album;
  var song9_image;
  var song10_name;
  var song10_artist;
  var song10_album;
  var song10_image;

  var xmlhttp = new XMLHttpRequest();
  var reqString = "https://api.spotify.com/v1/search?q=" + keyword + "&type=track"

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resp = JSON.parse(this.responseText);
      //console.log(JSON.parse(this.responseText));
      //console.log((resp.tracks.items[0]).album.images[0].url);
      if (resp.tracks.items[0]) {
        song1_name = (resp.tracks.items[0]).name;
        song1_artist = ((resp.tracks.items[0]).artists[0]).name;
        song1_album = (resp.tracks.items[0]).album.name;
        song1_image = (resp.tracks.items[0]).album.images[0].url;
      }
      if (resp.tracks.items[1]) {
        song2_name = (resp.tracks.items[1]).name;
        song2_artist = ((resp.tracks.items[1]).artists[0]).name;
        song2_album = (resp.tracks.items[1]).album.name;
        song2_image = (resp.tracks.items[1]).album.images[0].url;
      }
      if (resp.tracks.items[2]) {
        song3_name = (resp.tracks.items[2]).name;
        song3_artist = ((resp.tracks.items[2]).artists[0]).name;
        song3_album = (resp.tracks.items[2]).album.name;
        song3_image = (resp.tracks.items[2]).album.images[0].url;
      }
      if (resp.tracks.items[3]) {
        song4_name = (resp.tracks.items[3]).name;
        song4_artist = ((resp.tracks.items[3]).artists[0]).name;
        song4_album = (resp.tracks.items[3]).album.name;
        song4_image = (resp.tracks.items[3]).album.images[0].url;
      }
      if (resp.tracks.items[4]) {
        song5_name = (resp.tracks.items[4]).name;
        song5_artist = ((resp.tracks.items[4]).artists[0]).name;
        song5_album = (resp.tracks.items[4]).album.name;
        song5_image = (resp.tracks.items[4]).album.images[0].url;
      }
      if (resp.tracks.items[5]) {
        song6_name = (resp.tracks.items[5]).name;
        song6_artist = ((resp.tracks.items[5]).artists[0]).name;
        song6_album = (resp.tracks.items[5]).album.name;
        song6_image = (resp.tracks.items[5]).album.images[0].url;
      }
      if (resp.tracks.items[6]) {
        song7_name = (resp.tracks.items[6]).name;
        song7_artist = ((resp.tracks.items[6]).artists[0]).name;
        song7_album = (resp.tracks.items[6]).album.name;
        song7_image = (resp.tracks.items[6]).album.images[0].url;
      }
      if (resp.tracks.items[7]) {
        song8_name = (resp.tracks.items[7]).name;
        song8_artist = ((resp.tracks.items[7]).artists[0]).name;
        song8_album = (resp.tracks.items[7]).album.name;
        song8_image = (resp.tracks.items[7]).album.images[0].url;
      }
      if (resp.tracks.items[8]) {
        song9_name = (resp.tracks.items[8]).name;
        song9_artist = ((resp.tracks.items[8]).artists[0]).name;
        song9_album = (resp.tracks.items[8]).album.name;
        song9_image = (resp.tracks.items[8]).album.images[0].url;
      }
      if (resp.tracks.items[9]) {
        song10_name = (resp.tracks.items[9]).name;
        song10_artist = ((resp.tracks.items[9]).artists[0]).name;
        song10_album = (resp.tracks.items[9]).album.name;
        song10_image = (resp.tracks.items[9]).album.images[0].url;
      }

      var obj = { song1_name: song1_name, song1_artist: song1_artist, song1_album: song1_album, song1_image: song1_image, song2_name: song2_name, song2_artist: song2_artist, song2_album: song2_album, song2_image: song2_image, song3_name: song3_name, song3_artist: song3_artist, song3_album: song3_album, song3_image: song3_image, song4_name: song4_name, song4_artist: song4_artist, song4_album: song4_album, song4_image: song4_image,
    song5_name: song5_name, song5_artist: song5_artist, song5_album: song5_album, song5_image: song5_image, song6_name: song6_name, song6_artist: song6_artist, song6_album: song6_album, song6_image: song6_image, song7_name: song7_name, song7_artist: song7_artist, song7_album: song7_album, song7_image: song7_image, song8_name: song8_name, song8_artist: song8_artist, song8_album: song8_album, song8_image: song8_image,
    song9_name: song9_name, song9_artist: song9_artist, song9_album: song9_album, song9_image: song9_image, song10_name: song10_name, song10_artist: song10_artist, song10_album: song10_album, song10_image: song10_image,  };


      var myJSON = JSON.stringify(obj);
      console.log(myJSON);
      res.send(myJSON);
      //console.log(song1_artist);
      //console.log(song1_album);
    }
  }

  xmlhttp.open("GET",reqString);
  xmlhttp.send();
})

app.get('/getVideoId', function (req, res) {
  var name = req.query.name;
  var artist = req.query.artist;
  console.log(name + " " + artist);

  var xmlhttp3 = new XMLHttpRequest();

  xmlhttp3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resp2 = JSON.parse(this.responseText);
      console.log("YouTube API Response: ");
      console.log(JSON.parse(this.responseText));
      //var idString = "song" + playerNum + "-videoId";
      //console.log(idString);
      console.log((resp2.items[0]).id.videoId);

      var obj = { videoId: (resp2.items[0]).id.videoId };
      var myJSON = JSON.stringify(obj);
      console.log(myJSON);
      res.send(myJSON);
    }
  }




  var reqString = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + name + " " + artist +  " audio&type=video&key=AIzaSyA7IBm38aqE2pQTc83GpoCiM2oARcJsYBo";
  console.log(reqString);
  xmlhttp3.open("GET",reqString,false);
  xmlhttp3.send();
})

app.listen(port)
console.log("Running at Port " + port);
