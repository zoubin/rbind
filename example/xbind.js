var xbind = require('..');
var path = require('path');
console.log(['x.css', 'y.css'].map(xbind(path, 'basename', 1, '.css')));
// [ 'x', 'y' ]

