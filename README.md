# xbind

Sugar way to adapt the arguments signature of functions.

## Usage

```javascript
var xbind = require('xbind');
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
```

### xfn = xbind(fn, ctx)

Return a new function with a `xargs` property, through which arguments can be changed.

#### fn

Type: `Function`, `String`

Function to be bound. If `String`, it will be treated as a method name of `ctx`

#### ctx

Type: `Object`
`Optional`

`this` value of `fn` when called.
If not specified, `this` will be `this` of `xfn`.

#### xfn.xargs

Type: `Object`

Right now you can use `.push`, `.pop`, `.shift`, `.unshift`, `.slice`, `.splice`, as methods on `Array.prototype` with the same name.


### xfn = xbind.append(end, xargs, fn, ctx)

The same as:

```javascript
var xbind = require('xbind');
var xfn = xbind(fn, ctx);
xfn.xargs
    .slice(0, end)
    .push.apply(xfn.xargs, xargs);

```

```javascript
var append = require('xbind').append;
var path = require('path');

console.log(
    ['x.css', 'y.css'].map(
        append(1, ['.css'], path.basename)
    )
);

// [ 'x', 'y'  ]

```

#### xargs

Type: `Array`
`Optional`

Extra arguments to append.

#### end

Type: `Number`
`Optional`

How many arguments to retrieve before append `xargs`.
If not specified, all arguments will be retrieved.


### xbind.prepend(end, xargs, fn, ctx)

Same as `append`, except that `xargs` are prepended rather than appended.

```javascript
var prepend = require('xbind').prepend;
var path = require('path');

console.log(
    ['x.css', 'y.css'].map(
        prepend(1, ['/path/to/css'], path.resolve)
    )
);
// [ '/path/to/css/x.css', '/path/to/css/y.css'  ]

```
