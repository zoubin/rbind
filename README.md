# xbind

Like Function.prototype.bind, but with more features.

## Usage

```javascript
var xbind = require('xbind');
var rbind = require('xbind').r;
var lbind = require('xbind').l;
var sbind = require('xbind').s;
```

### rbind(ctx, fn, arg1, arg2,...)
Return a new function like `Function.prototype.bind`, but the args are inserted after rather than before the argument list.

* fn: *Function* | *String* If specified as a string, it must be a method of `ctx`
* ctx: *Object* *Optional* Execution context for `fn`. It can be omitted. In that case, The context of `fn` will be that of the new function when called.

```javascript
var rbind = require('xbind').r;
var path = require('path');
console.log(rbind(path, 'basename', '.css')('x.css'));
// x

```

### lbind(end, ctx, fn, arg1, arg2,...)
Return a new function like `Function.prototype.bind`, except that arugments passed in from index `end` will be ignored. You can specify `end` to `undefined` to ignore nothing.

* fn: *Function* | *String* If specified as a string, it must be a method of `ctx`
* ctx: *Object* *Optional* Execution context for `fn`.
* end: *Number* *Optional* where to discard the passed in arguments. No arguments will be discarded by default.

```javascript
var lbind = require('xbind').l;
var path = require('path');
console.log(lbind(1, path, 'resolve', '/a/b')('c.css'));
// /a/b/c.css

```


### xbind(start=0, ctx, fn, arg1, arg2,...)

Like `rbind`, except that if the returned new function is called with more than `start` arguments, those from `start` are ignored, and `arg1,arg2,..` are appended.

```javascript
var xbind = require('xbind');
var path = require('path');
console.log(['x.css', 'y.css'].map(xbind(1, path, 'basename', '.css')));
// [ 'x', 'y' ]

```


### sbind(start, deleteCount, ctx, fn, arg1, arg2,...)

The actual argument list is spliced by `Array.prototype.splice` called with `start, deleteCount, arg1, arg2,...`.


```javascript
var sbind = require('xbind').s;
var path = require('path');
console.log(['x.css', 'y.css'].map(sbind(1, 2, path, 'basename', '.css')));
// [ 'x', 'y' ]

```

