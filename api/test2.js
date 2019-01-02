'use strict';

var test = {
    info: function (response, query, info, callback) {
        console.log('Info2: ' + info);

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write('api Test from function<br />');
        //response.write('query = ' + JSON.stringify(query) + '<br />');
        //response.write('pathname = ' + pathname + '<br />');
        response.write('api meth = ' + query.meth + '<br />')
        //response.write('request.method = ' + request.method + '<br />')
        response.end();

        process.nextTick(function () { callback(info + ':edited'); });

        //setTimeout(function () { console.log('async test: 3 seconds after function finished'); }, 3000);
        

    },
    warning: function (warning) {
        console.log('Warning2: ' + warning);
    },
    error: function (error) {
        console.log('Error2: ' + error);
    }
};

module.exports = test