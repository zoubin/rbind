var xbind = require('..');
var path = require('path');

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

console.log(
    '`arrayify` just make an array from arguments',
    arrayify(0,1,2,3)
)

console.log(
    'use the first argument',
    xbind(arrayify).xargs(0)(0,1,2,3)
)

console.log(
    'use the first argument',
    xbind(arrayify).first()(0,1,2,3)
)

console.log(
    'use the last argument',
    xbind(arrayify).last()(0,1,2,3)
)

console.log(
    'use the first and third arguments',
    xbind(arrayify).xargs(0,2)(0,1,2,3),
    xbind(arrayify).xargs([0,2])(0,1,2,3)
)

console.log(
    'append arguments 4,5',
    xbind(arrayify).push(4,5)(0,1,2,3)
)

console.log(
    'prepend arguments 4,5',
    xbind(arrayify).unshift(4,5)(0,1,2,3)
)

console.log(
    'slice arguments 1,3',
    xbind(arrayify).slice(1,3)(0,1,2,3)
)

console.log(
    'filter arguments',
    xbind(arrayify).xargs(1,5).filter(Boolean)(0,1,2,3)
)

