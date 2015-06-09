var arrayify = require('arrayify-slice');
module.exports = xbind;
module.exports.rbind = rbind;
module.exports.sbind = sbind;

function xbind(c, f, start) {
    var args = parseArgs(arguments);
    var xargs = args.xargs;
    f = args.fn;
    c = args.ctx;
    start = xargs.shift() || 0;

    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var cargs = arrayify(arguments);
        cargs.splice.apply(cargs, [start, cargs.length].concat(xargs));
        return fn.apply(c || this, cargs);
    };
}

function rbind(c, f) {
    var args = parseArgs(arguments);
    var xargs = args.xargs;
    f = args.fn;
    c = args.ctx;

    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var cargs = arrayify(arguments).concat(xargs);
        return fn.apply(c || this, cargs);
    };
};

function sbind(c, f, start, deleteCount) {
    var args = parseArgs(arguments);
    var xargs = args.xargs;
    f = args.fn;
    c = args.ctx;

    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var cargs = arrayify(arguments);
        cargs.splice.apply(cargs, xargs);
        return fn.apply(c || this, cargs);
    };
}

function parseArgs(args) {
    args = arrayify(args);
    var f, c;
    if (typeof args[0] !== 'function') {
        c = args.shift();
        f = args.shift();
    } else {
        c = null;
        f = args.shift();
    }
    return {
        fn: f,
        ctx: c,
        xargs: args
    };
}
