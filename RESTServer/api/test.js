function test(query, callback) {

    var retObj = {
        "params": [],
        "employees": [
            { "firstName": "John", "lastName": "Doe" },
            { "firstName": "Anna", "lastName": "Smith" },
            { "firstName": "Peter", "lastName": "Jones" }
        ],
        "result":""
    }

    //show the parameters that were passed in the results
    for (var param in query) {
        retObj.params.push({ "paramName": param, "paramValue": query[param]});
    }

    var p1 = query['p1']

    retObj.result = p1.toUpperCase();
    retObj.resultNotes = 'You sent in ' + p1 + ' and the api changed it to ' + p1.toUpperCase();

    callback(false, retObj)

    //test async
    //process.nextTick(function () { callback(txt + ':edited', false); });
}

module.exports = test
