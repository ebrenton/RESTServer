# RESTServer

If the url begins with "/api" then we take the full pathname and attempt to load/require it as a js module which can then be called as a function.
Example:
apiMod = require('.' + pathname + '.js');
apiMod(query, function (err, res) {....})

If the url does not begin with "/api" then we attempt to load the files as a static page/document.

API Modules
===========
Because we are loading ("require"ing) the module based url, the api modules should only export 1 function.
This way we can call the module directly without needing to parse any more parameters for a specific function [like apiMod.func1() or apiMod.func2()] which would be possible but is not how this code was designed.
Examples:

// apiMod1
function test(query, callback) {
    //do something
	callback(xyz)
}
module.exports = test;

//apiMod2
module.exports = function (query, callback) {
	//do something
	callback(xyz)
}