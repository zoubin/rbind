var sbind = require('..');
var path = require('path');
console.log(['x.css', 'y.css'].map(sbind(1, 2, path, 'basename', '.css')));
// [ 'x', 'y' ]

