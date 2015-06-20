var prepend = require('..').prepend;
var path = require('path');

console.log(
    ['x.css', 'y.css'].map(
        prepend(1, ['/path/to/css'], path.resolve)
    )
);

