var rbind = require('..').rbind;
var path = require('path');
console.log(rbind(path, 'basename', '.css')('x.css'));
// x

