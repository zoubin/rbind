var append = require('..').append;
var path = require('path');

console.log(
    ['x.css', 'y.css'].map(
        append(1, ['.css'], path.basename)
    )
);

