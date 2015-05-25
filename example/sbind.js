var sbind = require('..').sbind;
var path = require('path');
console.log(['x.css', 'y.css'].map(sbind('basename', path, 1, 2, '.css')));
// [ 'x', 'y' ]

