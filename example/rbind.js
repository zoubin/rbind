var rbind = require('..').rbind;
var path = require('path');
console.log(rbind('basename', path, '.css')('x.css'));
// x

