var sbind = require('..').sbind;
var path = require('path');
console.log(['x.css', 'y.css'].map(sbind(path, 'basename', 1, 2, '.css')));
// [ 'x', 'y' ]

