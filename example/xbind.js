var xbind = require('..');
var path = require('path');
console.log(['x.css', 'y.css'].map(xbind(1, path, 'basename', '.css')));
// [ 'x', 'y' ]

