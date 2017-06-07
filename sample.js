var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function(request, response) {


    response.writeHead(200, {
        'Content-Type': 'audio/mp3'
    });

    let YTDL = require('node-youtube-dl')
    YTDL.download('nkqVm5aiC28', '140').then(function(Stream){
      Stream.pipe(response)
    }).catch(function(){
      console.log(arguments[0])
    })
})
.listen(2000);
