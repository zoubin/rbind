var rbind = require('..').r;
var path = require('path');
console.log(rbind(path, 'basename', '.css')('x.css'));
// x

