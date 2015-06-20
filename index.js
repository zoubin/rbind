var arrayify = require('arrayify-slice');
var XArgs = require('./lib/xargs.js');

module.exports = xbind;
module.exports.append = append;
module.exports.prepend = prepend;

function xbind(f, c) {
    var hasCtx = arguments.length > 1;
    var ctx = arguments[1];

    var xfn = function xfn() {
        var c = hasCtx ? ctx : this;
        var fn = typeof f === 'string' ? c[f] : f;
        var args = xfn.xargs.applyTransforms(arguments);
        return fn.apply(c, args);
    }

    xfn.xargs = new XArgs(xfn);

    return xfn;
}

function append() {
    var info = parse.apply(null, arguments);
    var fn = info[0];
    var xargs = info[1];
    if (xargs) {
        fn.xargs.push.apply(fn.xargs, xargs);
    }
    return fn;
}

function prepend() {
    var info = parse.apply(null, arguments);
    var fn = info[0];
    var xargs = info[1];
    if (xargs) {
        fn.xargs.splice.apply(fn.xargs, [0, 0].concat(xargs));
    }
    return fn;
}

function parse(end, xargs, f, c) {
    var args = arrayify(arguments);
    end = xargs = undefined;
    if (typeof args[0] === 'number') {
        end = args.shift();
    }
    if (Array.isArray(args[0])) {
        xargs = args.shift();
    }

    var fn = xbind.apply(null, args);
    fn.xargs.slice(0, end);
    return [fn, xargs];
}
