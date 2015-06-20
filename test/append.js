"use strict";

var test = require('tape');
var rbind = require('..').append;

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('append, context', function (t) {
    var o = {
        fn: function () {
            return this;
        }
    };
    var c = {};

    t.same(rbind('fn', o)(), o, 'fn is specified by name');
    t.same(rbind(o.fn, null)(), null, 'bind Null');
    t.same(rbind(o.fn, undefined)(), undefined, 'bind Undefined');
    t.same(rbind(o.fn, 1)(), 1, 'bind Number');
    t.same(rbind(o.fn, '1')(), '1', 'bind String');
    t.same(rbind(o.fn, true)(), true, 'bind Boolean');
    t.same(rbind(o.fn, c)(), c, 'bind Object');
    t.same(rbind(o.fn).call(c), c, 'use the calling context');

    t.end();
});

test('append', function (t) {
    var fn = rbind([2,3], arrayify);

    t.same(fn(), [2,3]);
    t.same(fn(1), [1,2,3]);
    t.same(fn(1,2), [1,2,2,3]);

    t.end();
});

test('append to', function (t) {
    var fn = rbind(1, [2,3], arrayify);

    t.same(fn(), [2,3]);
    t.same(fn(1), [1,2,3]);
    t.same(fn(1,2), [1,2,3]);

    t.end();
});

