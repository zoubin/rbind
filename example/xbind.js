var xbind = require('..');
var path = require('path');
console.log(
    ['x.css', 'y.css'].map(
        xbind(path.resolve) // return a new function
            .xargs
            .shift()    // get the first argument
            .unshift('/path/to/css')    // prepend an argument
            .unwrap()   // retrieve the new function
    )
);

// [ '/path/to/css/x.css', '/path/to/css/y.css'  ]
