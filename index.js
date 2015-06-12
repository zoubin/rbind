"use strict";

var arrayify = require('arrayify-slice');
module.exports = xbind;
module.exports.l = module.exports.lbind = lbind;

function lbind(end, c, f) {
    var args = parseArgs(arguments);
    var xargs = args.xargs;
    f = args.fn;
    c = args.ctx;
    // where to discard original args
    end = args.numbers[0];

    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var cargs = arrayify(arguments, 0, end);
        return fn.apply(args.hasOwnProperty('ctx') ? c : this, xargs.concat(cargs));
    };
}

function xbind(start, deleteCount, c, f) {
    var args = parseArgs(arguments);
    var xargs = args.xargs;
    f = args.fn;
    c = args.ctx;
    start = args.numbers[0];
    deleteCount = args.numbers[1];

    return function () {
        var fn = typeof f === 'string' ? c[f] : f;
        var cargs = arrayify(arguments);
        var len = cargs.length;
        var s = start == null ? len : start;
        var d = deleteCount == null ? len : deleteCount;
        cargs.splice.apply(cargs, [s, d].concat(xargs));
        return fn.apply(args.hasOwnProperty('ctx') ? c : this, cargs);
    };
}

function parseArgs(args) {
    var ret = {};
    args = arrayify(args);
    var numbers = [];
    while (typeof args[0] === 'number') {
        numbers.push(args.shift());
    }
    ret.numbers = numbers;
    if (typeof args[0] !== 'function') {
        ret.ctx = args.shift();
    }
    ret.fn = args.shift();
    ret.xargs = args;
    return ret;
}

