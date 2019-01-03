function testxxx(response, query, txt, callback) {

    //response.writeHead(200, { "Content-Type": "text/html" });
    //response.write('api Test from function<br />');
    ////response.write('query = ' + JSON.stringify(query) + '<br />');
    ////response.write('pathname = ' + pathname + '<br />');
    //response.write('api meth = ' + query.meth + '<br />')
    ////response.write('request.method = ' + request.method + '<br />')
    //response.end();

    callback(txt + ':edited', false)
    //process.nextTick(function () { callback(txt + ':edited', false); });
}

module.exports = testxxx
