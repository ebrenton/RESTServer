'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

var port = process.env.PORT || 8080;

//include all files in the api folder

//var requireDir = require('require-dir');
//var dir = requireDir('./api', { recurse: true });

http.createServer(function (request, response) {
    console.log('request ', request.url);

    if (request.url.toLowerCase().substr(0, 4) === '/api') {

        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        var pathname = url_parts.pathname;
        var apiMod = null;

        try {
            apiMod = require('.' + pathname + '.js');
        } catch(ex){
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end('error loading api module:' + pathname + '<br />', 'utf-8')
            apiMod = null;
        }

        if (!(apiMod === null)) {
            //apiMod.info(response, query, 'sample text', function (newVal) { console.log(newVal) });
            apiMod(query, function (err, res) {

                response.writeHead(200, { "Content-Type": "application/json" });

                if (err) {
                    console.log('error');
                } else {
                    console.log('ok');
                    //console.log(res);
                    //response.write('api Test<br />' + JSON.stringify(res) + '<br />');
                    //response.write('api Test<br />' + res.name + '<br />');
                    response.write(JSON.stringify(res));
                }

                response.end();
            });

            console.log('async test: past the funct call');

            //response.writeHead(200, { "Content-Type": "text/html" });
            //response.write('api Test<br />');
            //response.write('query = ' + JSON.stringify(query) + '<br />');
            //response.write('pathname = ' + pathname + '<br />');
            //response.write('api meth = ' + query.meth + '<br />')
            //response.write('request.method = ' + request.method + '<br />')
            //response.end();
        }
    } else {

        var filePath = './www' + request.url;
        if (filePath === './www/') {
            filePath = './www/index.html';
        }
        console.log(filePath);
        var extname = String(path.extname(filePath)).toLowerCase();

        //test
        console.log('Path resolved = ' + path.resolve(filePath));

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
                if (error.code === 'ENOENT') {
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
    }

}).listen(port);
console.log('Server running on port ' + port);