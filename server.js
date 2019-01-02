'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 8080;

//include all files in the api folder
//each file should have one main function that is the same as the file name
var requireDir = require('require-dir');
var dir = requireDir('./api', { recurse: true });

http.createServer(function (request, response) {
    console.log('request ', request.url);

    //if (slice(0, 4, request.url.toLowerCase()) === '/api') {
    //    response.writeHead(200, { 'Content-Type:': "text/html" });
    //    response.write('api Test');
    //    response.end(content, 'utf-8');
    //} else {

        var filePath = 'www' + request.url;
        if (filePath === 'www/') {
            filePath = 'www/index.html';
        }
        console.log(filePath);
        var extname = String(path.extname(filePath)).toLowerCase();
        var mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.svg': 'application/image/svg+xml'
        };

        var contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    //}

}).listen(port);
console.log('Server running on port ' + port);