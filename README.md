# xbind

Like Function.prototype.bind, but append extra arguments rather than prepend them.

## Usage

```javascript
var xbind = require('xbind');
var lbind = require('xbind').l;
```

### xbind(start, deleteCount, ctx, fn, arg1, arg2,...)

Return a new function with extra arguments appended.

* **start**: *Number* *Optional* where to insert the extra arguments (`xargs`) `arg1,arg2,...`. If not specified, `xargs` will be appended.
* **deleteCount**: *Number* *Optional* how many arguments form `start` should be deleted before inserting `xargs`. If not specified, all arguments from `start` will be deleted.
* **ctx**: *Object* *Optional* Execution context for `fn`. If omitted, the context of `fn` will be that of the new function when called.
* **fn**: *Function* | *String* If specified as a string, it must be a method of `ctx`


```javascript
var xbind = require('xbind');
var path = require('path');

console.log(['x.css', 'y.css'].map(xbind(1, path, 'basename', '.css')));
// [ 'x', 'y' ]

console.log(xbind(path, 'basename', '.css')('x.css'));
// x

```


### lbind(deleteFrom, ctx, fn, arg1, arg2,...)
Return a new function like `Function.prototype.bind`, except that arugments passed in from index `deleteFrom` will be ignored.

* fn: *Function* | *String* If specified as a string, it must be a method of `ctx`
* ctx: *Object* *Optional* Execution context for `fn`.
* deleteFrom: *Number* *Optional* where to discard the passed in arguments. No arguments will be discarded by default.

```javascript
var lbind = require('xbind').l;
var path = require('path');
console.log(lbind(1, path, 'resolve', '/a/b')('c.css'));
// /a/b/c.css

```
