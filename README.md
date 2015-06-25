# xbind

Sugar way to adapt the arguments signature of functions.

## Usage

```javascript
var xbind = require('xbind');
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
// `arrayify` just make an array from arguments [ 0, 1, 2, 3  ]

console.log(
    'use the first argument',
    xbind(arrayify).xargs(0)(0,1,2,3)
)
// use the first argument [ 0  ]

console.log(
    'use the first argument',
    xbind(arrayify).first()(0,1,2,3)
)
// use the first argument [ 0  ]

console.log(
    'use the last argument',
    xbind(arrayify).last()(0,1,2,3)
)
// use the last argument [ 3  ]

console.log(
    'use the first and third arguments',
    xbind(arrayify).xargs(0,2)(0,1,2,3),
    xbind(arrayify).xargs([0,2])(0,1,2,3)
)
// use the first and third arguments [ 0, 2  ] [ 0, 2  ]

console.log(
    'append arguments 4,5',
    xbind(arrayify).push(4,5)(0,1,2,3)
)
// append arguments 4,5 [ 0, 1, 2, 3, 4, 5  ]

console.log(
    'prepend arguments 4,5',
    xbind(arrayify).unshift(4,5)(0,1,2,3)
)
// prepend arguments 4,5 [ 4, 5, 0, 1, 2, 3  ]

console.log(
    'slice arguments 1,3',
    xbind(arrayify).slice(1,3)(0,1,2,3)
)
// slice arguments 1,3 [ 1, 2  ]

console.log(
    'filter arguments',
    xbind(arrayify).xargs(1,5).filter(Boolean)(0,1,2,3)
)
// filter arguments [ 1  ]

```

## xfn = xbind(fn, ctx)

Return a new function with a `xargs` property, through which arguments can be changed.

### fn

Type: `Function`, `String`

Function to be bound. If `String`, it will be treated as a method name of `ctx`

### ctx

Type: `Object`
`Optional`

`this` value of `fn` when called.
If not specified, `this` will be `this` of `xfn`.

## operations

### xfn.xargs(index1, index2)

Select arguments with `index1, index2`

### xfn.first()

Select the first argument

### xfn.last()

Select the last argument

### Array methods

You can operate the argument list using `.push`, `.pop`, `.shift`, `.unshift`, `.slice`, `.splice`, `.filter`, `.map`, `.reduce`, as the argument list is `Array`.


## xbind.identity(o)

Just return a function that returns `o`

