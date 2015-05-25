var xbind = require('..');
var path = require('path');
console.log(['x.css', 'y.css'].map(xbind('basename', path, 1, '.css')));
// [ 'x', 'y' ]

