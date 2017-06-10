var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

var connect = require('connect');

var parsedFiles = [];

var app = connect()
    .use(function(request, response){

    response.setHeader("Access-Control-Allow-Origin", "*");

    if (request && request._parsedUrl.query) {
      var query = request._parsedUrl.query;
      var videoId = query.substring(8, 19);
      var filename = query.substring(29);
      console.log(videoId);
      console.log(filename);

      if (parsedFiles.indexOf(videoId) === -1) {
        /*let YTDL = require('node-youtube-dl')
        YTDL.download(videoId, '140').then(function(Stream){
          response.writeHead(200, {
              'Content-Type': 'audio/m4a',
              'Content-Disposition': 'attachment; filename=' + filename + '.m4a'
          });
          //response.write(JSON.stringify(Stream))
          Stream.pipe(response);
        }).then(function() {
          //parsedFiles = [];
          parsedFiles.push(videoId);
        }).catch(function(){
          console.log(arguments[0])
        });*/
        var youtubedl = require('youtube-dl');
        var video = youtubedl('http://www.youtube.com/watch?v=' + videoId,
          // Optional arguments passed to youtube-dl.
          ['--format=18'],
          // Additional options can be given for calling `child_process.execFile()`.
          { cwd: __dirname });

        // Will be called when the download starts.
        video.on('info', function(info) {
          console.log('Download started');
          console.log('filename: ' + info.filename);
          console.log('size: ' + info.size);
        });

        response.writeHead(200, {
            'Content-Type': 'audio/m4a',
            'Content-Disposition': 'attachment; filename=' + filename + '.m4a'
        });

        video.pipe(response);
      }
      else {
        console.log("skip this");
        //response.sendStatus(200);
      }
    }

 });

var server = http.createServer(app);
server.listen(2000, function(request, response) {
    console.log(request);
    console.log('server is listening');
    //response.send("hi");

});
