var slice = require('..').slice;
var first = require('..').first;
var path = require('path');

console.log(
    ['x.css', 'y.css'].map(
        slice(0, 1, path.basename)
    )
);
// [ 'x.css', 'y.css'  ]

console.log(
    ['x.css', 'y.css'].map(
        first(path.basename)
    )
);
// [ 'x.css', 'y.css'  ]

