var lbind = require('..').l;
var path = require('path');
console.log(lbind(1, path, 'resolve', '/a/b')('c.css'));
// /a/b/c.css

