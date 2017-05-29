var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'soundbit_admin',
  password : 'weareacompressioncompany',
  database : 'soundbit'
});

connection.connect();

var billboard = require("billboard-top-100").getChart;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');
var bodyParser = require('body-parser')

var port = process.env.PORT || 3000;

const fs = require('fs');
const ytdl = require('ytdl-core');
var youtubedl = require('youtube-dl');
var express = require('express')
var path = require("path")
var app = express()
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/home.html'));
})

app.get('/signin', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/signin.html'));
})

app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/signup.html'));
})

app.get('/search', function (req, res) {
  var finalReqString = '/public/searchresults.html';
  res.sendFile(path.join(__dirname+finalReqString));
})

app.get('/charts', function (req, res) {
  var finalReqString = '/public/chart.html';
  res.sendFile(path.join(__dirname+finalReqString));
})

app.get('/discover', function (req, res) {
  var finalReqString = '/public/discover.html';
  res.sendFile(path.join(__dirname+finalReqString));
})

app.get('/authenticateCredentials', function (req, res) {
  var email = req.query.email;
  var password = req.query.password;

  var sqlString1 = 'SELECT * FROM soundbit_users WHERE email=\'' + email + '\'';
  connection.query(sqlString1, function (error, results, fields) {
    if (error) {
      throw error;
    }
    //console.log('The solution is: ', results[0]);
    var checkUndef = "" + results[0];
    //console.log(checkUndef);
    if (checkUndef == "undefined") {
      console.log("ERROR: Email address not in use");
      var obj = { body: 'ERROR: Email address not in use' };
      var myJSON = JSON.stringify(obj);
      res.send(myJSON);
    }
    else {
      if (password == results[0].password) {
        console.log("OK");
        var obj = { body: 'OK' };
        var myJSON = JSON.stringify(obj);
        res.send(myJSON);
      }
      else {
        console.log("ERROR: Email/password combination invalid");
        var obj = { body: 'ERROR: Email/password combination invalid' };
        var myJSON = JSON.stringify(obj);
        res.send(myJSON);
      }
    }
  })


})

app.get('/addUser', function (req, res) {
  //console.log(req.body.email);
  //console.log(req.body.password);
  var firstName = req.query.firstName;
  firstName = firstName.substring(1);
  var lastName = req.query.lastName;
  var email = req.query.email;
  var password = req.query.password;
  //console.log(firstName);
  //console.log(lastName);
  //console.log(email);
  //console.log(password);

  var sqlString1 = 'SELECT * FROM soundbit_users WHERE email=\'' + email + '\'';
  connection.query(sqlString1, function (error, results, fields) {
    if (error) {
      throw error;
    }
    //console.log('The solution is: ', results[0]);
    var checkUndef = "" + results[0];
    if (checkUndef == "undefined") {
      var sqlString2 = 'INSERT INTO soundbit_users (firstName, lastName, email, password) VALUES (\'' + firstName + '\', \'' + lastName + '\', \'' + email + '\', \'' + password + '\')';
      connection.query(sqlString2, function (error) {
        if (error) {
          throw error;
        }
      })

      //res.redirect('http://localhost:3000/discover');
      console.log("OK");
      var obj = { body: 'OK' };
      var myJSON = JSON.stringify(obj);
      res.send(myJSON);
    }
    else {
      console.log("ERROR: Email already in use");
      var obj = { body: 'ERROR: Email already in use' };
      var myJSON = JSON.stringify(obj);
      res.send(myJSON);
    }
  })




  //var finalReqString = '/public/discover.html';
  //res.sendFile(path.join(__dirname+finalReqString));
})

app.get('/downloadSong', function (req, res) {
  //var finalReqString = '/public/discover.html';
  //res.sendFile(path.join(__dirname+finalReqString));
  var name = req.query.name;
  var artist = req.query.artist;
  console.log(name);
  console.log(artist);

  var xmlhttp4 = new XMLHttpRequest();

  xmlhttp4.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resp2 = JSON.parse(this.responseText);
      //var idString = "song" + playerNum + "-videoId";
      //console.log(idString);
      console.log(resp2.videoId);
      var videoId = resp2.videoId;
      var fullURL = "https://www.youtube.com/watch?v=" + videoId;
      console.log(fullURL);
      var titleString = artist + " - " + name + ".mp3";

      ytdl(fullURL, { format: 'mp3' }).pipe(fs.createWriteStream(path.join(__dirname+('/songs/'+ titleString))));


      /*var video = youtubedl(fullURL,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: path.join(__dirname + '/songs/') });

      // Will be called when the download starts.
      video.on('info', function(info) {
        console.log('Download started');
        console.log('filename: ' + info.filename);
        console.log('size: ' + info.size);
      });

      video.pipe(fs.createWriteStream(titleString));*/




      var obj = { body: "OK" };
      var myJSON = JSON.stringify(obj);
      console.log(myJSON);
      res.send(myJSON);
    }
  }




  var reqString = "http://localhost:3000/getVideoId?name=" + name + "&artist=" + artist;
  console.log(reqString);
  xmlhttp4.open("GET",reqString);
  xmlhttp4.send();

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
  // get top 50 songs related to keyword

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
  var song11_name;
  var song11_artist;
  var song11_album;
  var song11_image;
  var song12_name;
  var song12_artist;
  var song12_album;
  var song12_image;
  var song13_name;
  var song13_artist;
  var song13_album;
  var song13_image;
  var song14_name;
  var song14_artist;
  var song14_album;
  var song14_image;
  var song15_name;
  var song15_artist;
  var song15_album;
  var song15_image;
  var song16_name;
  var song16_artist;
  var song16_album;
  var song16_image;
  var song17_name;
  var song17_artist;
  var song17_album;
  var song17_image;
  var song18_name;
  var song18_artist;
  var song18_album;
  var song18_image;
  var song19_name;
  var song19_artist;
  var song19_album;
  var song19_image;
  var song20_name;
  var song20_artist;
  var song20_album;
  var song20_image;
  var song21_name;
  var song21_artist;
  var song21_album;
  var song21_image;
  var song22_name;
  var song22_artist;
  var song22_album;
  var song22_image;
  var song23_name;
  var song23_artist;
  var song23_album;
  var song23_image;
  var song24_name;
  var song24_artist;
  var song24_album;
  var song24_image;
  var song25_name;
  var song25_artist;
  var song25_album;
  var song25_image;
  var song26_name;
  var song26_artist;
  var song26_album;
  var song26_image;
  var song27_name;
  var song27_artist;
  var song27_album;
  var song27_image;
  var song28_name;
  var song28_artist;
  var song28_album;
  var song28_image;
  var song29_name;
  var song29_artist;
  var song29_album;
  var song29_image;
  var song30_name;
  var song30_artist;
  var song30_album;
  var song30_image;
  var song31_name;
  var song31_artist;
  var song31_album;
  var song31_image;
  var song32_name;
  var song32_artist;
  var song32_album;
  var song32_image;
  var song33_name;
  var song33_artist;
  var song33_album;
  var song33_image;
  var song34_name;
  var song34_artist;
  var song34_album;
  var song34_image;
  var song35_name;
  var song35_artist;
  var song35_album;
  var song35_image;
  var song36_name;
  var song36_artist;
  var song36_album;
  var song36_image;
  var song37_name;
  var song37_artist;
  var song37_album;
  var song37_image;
  var song38_name;
  var song38_artist;
  var song38_album;
  var song38_image;
  var song39_name;
  var song39_artist;
  var song39_album;
  var song39_image;
  var song40_name;
  var song40_artist;
  var song40_album;
  var song40_image;
  var song41_name;
  var song41_artist;
  var song41_album;
  var song41_image;
  var song42_name;
  var song42_artist;
  var song42_album;
  var song42_image;
  var song43_name;
  var song43_artist;
  var song43_album;
  var song43_image;
  var song44_name;
  var song44_artist;
  var song44_album;
  var song44_image;
  var song45_name;
  var song45_artist;
  var song45_album;
  var song45_image;
  var song46_name;
  var song46_artist;
  var song46_album;
  var song46_image;
  var song47_name;
  var song47_artist;
  var song47_album;
  var song47_image;
  var song48_name;
  var song48_artist;
  var song48_album;
  var song48_image;
  var song49_name;
  var song49_artist;
  var song49_album;
  var song49_image;
  var song50_name;
  var song50_artist;
  var song50_album;
  var song50_image;

  var xmlhttp = new XMLHttpRequest();
  var reqString = "https://api.spotify.com/v1/search?q=" + keyword + "&type=track&limit=50"

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
      if (resp.tracks.items[10]) {
        song11_name = (resp.tracks.items[10]).name;
        song11_artist = ((resp.tracks.items[10]).artists[0]).name;
        song11_album = (resp.tracks.items[10]).album.name;
        song11_image = (resp.tracks.items[10]).album.images[0].url;
}      if (resp.tracks.items[11]) {
        song12_name = (resp.tracks.items[11]).name;
        song12_artist = ((resp.tracks.items[11]).artists[0]).name;
        song12_album = (resp.tracks.items[11]).album.name;
        song12_image = (resp.tracks.items[11]).album.images[0].url;
}      if (resp.tracks.items[12]) {
        song13_name = (resp.tracks.items[12]).name;
        song13_artist = ((resp.tracks.items[12]).artists[0]).name;
        song13_album = (resp.tracks.items[12]).album.name;
        song13_image = (resp.tracks.items[12]).album.images[0].url;
}      if (resp.tracks.items[13]) {
        song14_name = (resp.tracks.items[13]).name;
        song14_artist = ((resp.tracks.items[13]).artists[0]).name;
        song14_album = (resp.tracks.items[13]).album.name;
        song14_image = (resp.tracks.items[13]).album.images[0].url;
}      if (resp.tracks.items[14]) {
        song15_name = (resp.tracks.items[14]).name;
        song15_artist = ((resp.tracks.items[14]).artists[0]).name;
        song15_album = (resp.tracks.items[14]).album.name;
        song15_image = (resp.tracks.items[14]).album.images[0].url;
}      if (resp.tracks.items[15]) {
        song16_name = (resp.tracks.items[15]).name;
        song16_artist = ((resp.tracks.items[15]).artists[0]).name;
        song16_album = (resp.tracks.items[15]).album.name;
        song16_image = (resp.tracks.items[15]).album.images[0].url;
}      if (resp.tracks.items[16]) {
        song17_name = (resp.tracks.items[16]).name;
        song17_artist = ((resp.tracks.items[16]).artists[0]).name;
        song17_album = (resp.tracks.items[16]).album.name;
        song17_image = (resp.tracks.items[16]).album.images[0].url;
}      if (resp.tracks.items[17]) {
        song18_name = (resp.tracks.items[17]).name;
        song18_artist = ((resp.tracks.items[17]).artists[0]).name;
        song18_album = (resp.tracks.items[17]).album.name;
        song18_image = (resp.tracks.items[17]).album.images[0].url;
}      if (resp.tracks.items[18]) {
        song19_name = (resp.tracks.items[18]).name;
        song19_artist = ((resp.tracks.items[18]).artists[0]).name;
        song19_album = (resp.tracks.items[18]).album.name;
        song19_image = (resp.tracks.items[18]).album.images[0].url;
}      if (resp.tracks.items[19]) {
        song20_name = (resp.tracks.items[19]).name;
        song20_artist = ((resp.tracks.items[19]).artists[0]).name;
        song20_album = (resp.tracks.items[19]).album.name;
        song20_image = (resp.tracks.items[19]).album.images[0].url;
}      if (resp.tracks.items[20]) {
        song21_name = (resp.tracks.items[20]).name;
        song21_artist = ((resp.tracks.items[20]).artists[0]).name;
        song21_album = (resp.tracks.items[20]).album.name;
        song21_image = (resp.tracks.items[20]).album.images[0].url;
}      if (resp.tracks.items[21]) {
        song22_name = (resp.tracks.items[21]).name;
        song22_artist = ((resp.tracks.items[21]).artists[0]).name;
        song22_album = (resp.tracks.items[21]).album.name;
        song22_image = (resp.tracks.items[21]).album.images[0].url;
}      if (resp.tracks.items[22]) {
        song23_name = (resp.tracks.items[22]).name;
        song23_artist = ((resp.tracks.items[22]).artists[0]).name;
        song23_album = (resp.tracks.items[22]).album.name;
        song23_image = (resp.tracks.items[22]).album.images[0].url;
}      if (resp.tracks.items[23]) {
        song24_name = (resp.tracks.items[23]).name;
        song24_artist = ((resp.tracks.items[23]).artists[0]).name;
        song24_album = (resp.tracks.items[23]).album.name;
        song24_image = (resp.tracks.items[23]).album.images[0].url;
}      if (resp.tracks.items[24]) {
        song25_name = (resp.tracks.items[24]).name;
        song25_artist = ((resp.tracks.items[24]).artists[0]).name;
        song25_album = (resp.tracks.items[24]).album.name;
        song25_image = (resp.tracks.items[24]).album.images[0].url;
}      if (resp.tracks.items[25]) {
        song26_name = (resp.tracks.items[25]).name;
        song26_artist = ((resp.tracks.items[25]).artists[0]).name;
        song26_album = (resp.tracks.items[25]).album.name;
        song26_image = (resp.tracks.items[25]).album.images[0].url;
}      if (resp.tracks.items[26]) {
        song27_name = (resp.tracks.items[26]).name;
        song27_artist = ((resp.tracks.items[26]).artists[0]).name;
        song27_album = (resp.tracks.items[26]).album.name;
        song27_image = (resp.tracks.items[26]).album.images[0].url;
}      if (resp.tracks.items[27]) {
        song28_name = (resp.tracks.items[27]).name;
        song28_artist = ((resp.tracks.items[27]).artists[0]).name;
        song28_album = (resp.tracks.items[27]).album.name;
        song28_image = (resp.tracks.items[27]).album.images[0].url;
}      if (resp.tracks.items[28]) {
        song29_name = (resp.tracks.items[28]).name;
        song29_artist = ((resp.tracks.items[28]).artists[0]).name;
        song29_album = (resp.tracks.items[28]).album.name;
        song29_image = (resp.tracks.items[28]).album.images[0].url;
}      if (resp.tracks.items[29]) {
        song30_name = (resp.tracks.items[29]).name;
        song30_artist = ((resp.tracks.items[29]).artists[0]).name;
        song30_album = (resp.tracks.items[29]).album.name;
        song30_image = (resp.tracks.items[29]).album.images[0].url;
}      if (resp.tracks.items[30]) {
        song31_name = (resp.tracks.items[30]).name;
        song31_artist = ((resp.tracks.items[30]).artists[0]).name;
        song31_album = (resp.tracks.items[30]).album.name;
        song31_image = (resp.tracks.items[30]).album.images[0].url;
}      if (resp.tracks.items[31]) {
        song32_name = (resp.tracks.items[31]).name;
        song32_artist = ((resp.tracks.items[31]).artists[0]).name;
        song32_album = (resp.tracks.items[31]).album.name;
        song32_image = (resp.tracks.items[31]).album.images[0].url;
}      if (resp.tracks.items[32]) {
        song33_name = (resp.tracks.items[32]).name;
        song33_artist = ((resp.tracks.items[32]).artists[0]).name;
        song33_album = (resp.tracks.items[32]).album.name;
        song33_image = (resp.tracks.items[32]).album.images[0].url;
}      if (resp.tracks.items[33]) {
        song34_name = (resp.tracks.items[33]).name;
        song34_artist = ((resp.tracks.items[33]).artists[0]).name;
        song34_album = (resp.tracks.items[33]).album.name;
        song34_image = (resp.tracks.items[33]).album.images[0].url;
}      if (resp.tracks.items[34]) {
        song35_name = (resp.tracks.items[34]).name;
        song35_artist = ((resp.tracks.items[34]).artists[0]).name;
        song35_album = (resp.tracks.items[34]).album.name;
        song35_image = (resp.tracks.items[34]).album.images[0].url;
}      if (resp.tracks.items[35]) {
        song36_name = (resp.tracks.items[35]).name;
        song36_artist = ((resp.tracks.items[35]).artists[0]).name;
        song36_album = (resp.tracks.items[35]).album.name;
        song36_image = (resp.tracks.items[35]).album.images[0].url;
}      if (resp.tracks.items[36]) {
        song37_name = (resp.tracks.items[36]).name;
        song37_artist = ((resp.tracks.items[36]).artists[0]).name;
        song37_album = (resp.tracks.items[36]).album.name;
        song37_image = (resp.tracks.items[36]).album.images[0].url;
}      if (resp.tracks.items[37]) {
        song38_name = (resp.tracks.items[37]).name;
        song38_artist = ((resp.tracks.items[37]).artists[0]).name;
        song38_album = (resp.tracks.items[37]).album.name;
        song38_image = (resp.tracks.items[37]).album.images[0].url;
}      if (resp.tracks.items[38]) {
        song39_name = (resp.tracks.items[38]).name;
        song39_artist = ((resp.tracks.items[38]).artists[0]).name;
        song39_album = (resp.tracks.items[38]).album.name;
        song39_image = (resp.tracks.items[38]).album.images[0].url;
}      if (resp.tracks.items[39]) {
        song40_name = (resp.tracks.items[39]).name;
        song40_artist = ((resp.tracks.items[39]).artists[0]).name;
        song40_album = (resp.tracks.items[39]).album.name;
        song40_image = (resp.tracks.items[39]).album.images[0].url;
}      if (resp.tracks.items[40]) {
        song41_name = (resp.tracks.items[40]).name;
        song41_artist = ((resp.tracks.items[40]).artists[0]).name;
        song41_album = (resp.tracks.items[40]).album.name;
        song41_image = (resp.tracks.items[40]).album.images[0].url;
}      if (resp.tracks.items[41]) {
        song42_name = (resp.tracks.items[41]).name;
        song42_artist = ((resp.tracks.items[41]).artists[0]).name;
        song42_album = (resp.tracks.items[41]).album.name;
        song42_image = (resp.tracks.items[41]).album.images[0].url;
}      if (resp.tracks.items[42]) {
        song43_name = (resp.tracks.items[42]).name;
        song43_artist = ((resp.tracks.items[42]).artists[0]).name;
        song43_album = (resp.tracks.items[42]).album.name;
        song43_image = (resp.tracks.items[42]).album.images[0].url;
}      if (resp.tracks.items[43]) {
        song44_name = (resp.tracks.items[43]).name;
        song44_artist = ((resp.tracks.items[43]).artists[0]).name;
        song44_album = (resp.tracks.items[43]).album.name;
        song44_image = (resp.tracks.items[43]).album.images[0].url;
}      if (resp.tracks.items[44]) {
        song45_name = (resp.tracks.items[44]).name;
        song45_artist = ((resp.tracks.items[44]).artists[0]).name;
        song45_album = (resp.tracks.items[44]).album.name;
        song45_image = (resp.tracks.items[44]).album.images[0].url;
}      if (resp.tracks.items[45]) {
        song46_name = (resp.tracks.items[45]).name;
        song46_artist = ((resp.tracks.items[45]).artists[0]).name;
        song46_album = (resp.tracks.items[45]).album.name;
        song46_image = (resp.tracks.items[45]).album.images[0].url;
}      if (resp.tracks.items[46]) {
        song47_name = (resp.tracks.items[46]).name;
        song47_artist = ((resp.tracks.items[46]).artists[0]).name;
        song47_album = (resp.tracks.items[46]).album.name;
        song47_image = (resp.tracks.items[46]).album.images[0].url;
}      if (resp.tracks.items[47]) {
        song48_name = (resp.tracks.items[47]).name;
        song48_artist = ((resp.tracks.items[47]).artists[0]).name;
        song48_album = (resp.tracks.items[47]).album.name;
        song48_image = (resp.tracks.items[47]).album.images[0].url;
}      if (resp.tracks.items[48]) {
        song49_name = (resp.tracks.items[48]).name;
        song49_artist = ((resp.tracks.items[48]).artists[0]).name;
        song49_album = (resp.tracks.items[48]).album.name;
        song49_image = (resp.tracks.items[48]).album.images[0].url;
}      if (resp.tracks.items[49]) {
        song50_name = (resp.tracks.items[49]).name;
        song50_artist = ((resp.tracks.items[49]).artists[0]).name;
        song50_album = (resp.tracks.items[49]).album.name;
        song50_image = (resp.tracks.items[49]).album.images[0].url;
      }



      var obj = { song1_name: song1_name, song1_artist: song1_artist, song1_album: song1_album, song1_image: song1_image, song2_name: song2_name, song2_artist: song2_artist, song2_album: song2_album, song2_image: song2_image, song3_name: song3_name, song3_artist: song3_artist, song3_album: song3_album, song3_image: song3_image, song4_name: song4_name, song4_artist: song4_artist, song4_album: song4_album, song4_image: song4_image,
    song5_name: song5_name, song5_artist: song5_artist, song5_album: song5_album, song5_image: song5_image, song6_name: song6_name, song6_artist: song6_artist, song6_album: song6_album, song6_image: song6_image, song7_name: song7_name, song7_artist: song7_artist, song7_album: song7_album, song7_image: song7_image, song8_name: song8_name, song8_artist: song8_artist, song8_album: song8_album, song8_image: song8_image,
    song9_name: song9_name, song9_artist: song9_artist, song9_album: song9_album, song9_image: song9_image, song10_name: song10_name, song10_artist: song10_artist, song10_album: song10_album, song10_image: song10_image,
    song11_name: song11_name, song11_artist: song11_artist, song11_album: song11_album, song11_image: song11_image,
    song12_name: song12_name, song12_artist: song12_artist, song12_album: song12_album, song12_image: song12_image,
    song13_name: song13_name, song13_artist: song13_artist, song13_album: song13_album, song13_image: song13_image,
    song14_name: song14_name, song14_artist: song14_artist, song14_album: song14_album, song14_image: song14_image,
    song15_name: song15_name, song15_artist: song15_artist, song15_album: song15_album, song15_image: song15_image,
    song16_name: song16_name, song16_artist: song16_artist, song16_album: song16_album, song16_image: song16_image,
    song17_name: song17_name, song17_artist: song17_artist, song17_album: song17_album, song17_image: song17_image,
    song18_name: song18_name, song18_artist: song18_artist, song18_album: song18_album, song18_image: song18_image,
    song19_name: song19_name, song19_artist: song19_artist, song19_album: song19_album, song19_image: song19_image,
    song20_name: song20_name, song20_artist: song20_artist, song20_album: song20_album, song20_image: song20_image,
    song21_name: song21_name, song21_artist: song21_artist, song21_album: song21_album, song21_image: song21_image,
    song22_name: song22_name, song22_artist: song22_artist, song22_album: song22_album, song22_image: song22_image,
    song23_name: song23_name, song23_artist: song23_artist, song23_album: song23_album, song23_image: song23_image,
    song24_name: song24_name, song24_artist: song24_artist, song24_album: song24_album, song24_image: song24_image,
    song25_name: song25_name, song25_artist: song25_artist, song25_album: song25_album, song25_image: song25_image,
    song26_name: song26_name, song26_artist: song26_artist, song26_album: song26_album, song26_image: song26_image,
    song27_name: song27_name, song27_artist: song27_artist, song27_album: song27_album, song27_image: song27_image,
    song28_name: song28_name, song28_artist: song28_artist, song28_album: song28_album, song28_image: song28_image,
    song29_name: song29_name, song29_artist: song29_artist, song29_album: song29_album, song29_image: song29_image,
    song30_name: song30_name, song30_artist: song30_artist, song30_album: song30_album, song30_image: song30_image,
    song31_name: song31_name, song31_artist: song31_artist, song31_album: song31_album, song31_image: song31_image,
    song32_name: song32_name, song32_artist: song32_artist, song32_album: song32_album, song32_image: song32_image,
    song33_name: song33_name, song33_artist: song33_artist, song33_album: song33_album, song33_image: song33_image,
    song34_name: song34_name, song34_artist: song34_artist, song34_album: song34_album, song34_image: song34_image,
    song35_name: song35_name, song35_artist: song35_artist, song35_album: song35_album, song35_image: song35_image,
    song36_name: song36_name, song36_artist: song36_artist, song36_album: song36_album, song36_image: song36_image,
    song37_name: song37_name, song37_artist: song37_artist, song37_album: song37_album, song37_image: song37_image,
    song38_name: song38_name, song38_artist: song38_artist, song38_album: song38_album, song38_image: song38_image,
    song39_name: song39_name, song39_artist: song39_artist, song39_album: song39_album, song39_image: song39_image,
    song40_name: song40_name, song40_artist: song40_artist, song40_album: song40_album, song40_image: song40_image,
    song41_name: song41_name, song41_artist: song41_artist, song41_album: song41_album, song41_image: song41_image,
    song42_name: song42_name, song42_artist: song42_artist, song42_album: song42_album, song42_image: song42_image,
    song43_name: song43_name, song43_artist: song43_artist, song43_album: song43_album, song43_image: song43_image,
    song44_name: song44_name, song44_artist: song44_artist, song44_album: song44_album, song44_image: song44_image,
    song45_name: song45_name, song45_artist: song45_artist, song45_album: song45_album, song45_image: song45_image,
    song46_name: song46_name, song46_artist: song46_artist, song46_album: song46_album, song46_image: song46_image,
    song47_name: song47_name, song47_artist: song47_artist, song47_album: song47_album, song47_image: song47_image,
    song48_name: song48_name, song48_artist: song48_artist, song48_album: song48_album, song48_image: song48_image,
    song49_name: song49_name, song49_artist: song49_artist, song49_album: song49_album, song49_image: song49_image,
    song50_name: song50_name, song50_artist: song50_artist, song50_album: song50_album, song50_image: song50_image };


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
      console.log(resp2.items[0]);
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
  xmlhttp3.open("GET",reqString);
  xmlhttp3.send();
})

app.listen(port)
console.log("Running at Port " + port);
