# xbind

Like Function.prototype.bind, but with more features.

## Usage

```javascript
var xbind = require('xbind');
var rbind = require('xbind').rbind;
var sbind = require('xbind').sbind;
```

### rbind(fn, ctx, arg1, arg2,...)
Return a new function like `Function.prototype.bind`, but the args are inserted after rather than before the argument list.

* fn: *Function* | *String* If specified as a string, it must be a method of `ctx`
* ctx: *Object* Execution context for `fn`.

```javascript
var rbind = require('xbind').rbind;
var path = require('path');
console.log(rbind('basename', path, '.css')('x.css'));
// x

```


### xbind(fn, ctx, start, arg1, arg2,...)

Like `rbind`, except that if the returned new function is called with more than `start` arguments, those from `start` are ignored, and `arg1,arg2,..` are appended.

```javascript
var xbind = require('xbind');
var path = require('path');
console.log(['x.css', 'y.css'].map(xbind('basename', path, 1, '.css')));
// [ 'x', 'y' ]

```


### sbind(fn, ctx, start, deleteCount, arg1, arg2,...)

The actual argument list is spliced by `Array.prototype.splice` called with `start, deleteCount, arg1, arg2,...`.


```javascript
var sbind = require('xbind').sbind;
var path = require('path');
console.log(['x.css', 'y.css'].map(sbind('basename', path, 1, 2, '.css')));
// [ 'x', 'y' ]

```

