module.exports = xbind;
module.exports.rbind = rbind;
module.exports.sbind = sbind;

function xbind(f, c, start) {
    start = start || 0;
    var xargs = arguments.length > 3 ? arrayify(arguments, 3) : null;
    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var args = arrayify(arguments);
        if (args.length < start) {
            start = args.length;
        }
        args = args.slice(0, start).concat(xargs || []);
        return fn.apply(c || this, args);
    };
}

function rbind(f, c) {
    var xargs = arguments.length > 2 ? arrayify(arguments, 2) : null;
    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var args = xargs ? arrayify(arguments).concat(xargs) : arguments;
        return fn.apply(c || this, args);
    };
};

function sbind(f, c, start, deleteCount) {
    var xargs = arguments.length > 4 ? arrayify(arguments, 4) : null;
    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var args = arrayify(arguments);
        args.splice.apply(args, [start, deleteCount].concat(xargs || []));
        return fn.apply(c || this, args);
    };
}

function arrayify(o, from, to) {
    return Array.prototype.slice.call(o, from, to);
}
