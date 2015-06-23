"use strict";

var test = require('tape');
var slice = require('..').slice;
var first = require('..').first;

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('drop, context', function (t) {
    var o = {
        fn: function () {
            return this;
        }
    };
    var c = {};

    t.same(slice('fn', o)(), o, 'fn is specified by name');
    t.same(slice(o.fn, null)(), null, 'bind Null');
    t.same(slice(o.fn, undefined)(), undefined, 'bind Undefined');
    t.same(slice(o.fn, 1)(), 1, 'bind Number');
    t.same(slice(o.fn, '1')(), '1', 'bind String');
    t.same(slice(o.fn, true)(), true, 'bind Boolean');
    t.same(slice(o.fn, c)(), c, 'bind Object');
    t.same(slice(o.fn).call(c), c, 'use the calling context');

    t.end();
});

test('slice', function (t) {
    var fn = slice(arrayify);
    t.same(fn(), []);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1,2]);

    fn = slice(1, arrayify);
    t.same(fn(), []);
    t.same(fn(1), []);
    t.same(fn(1,2), [2]);
    t.same(fn(1,2,3), [2,3]);

    fn = slice(0, 2, arrayify);
    t.same(fn(), []);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1,2]);
    t.same(fn(1,2,3), [1,2]);

    t.end();
});

test('first', function (t) {
    var fn = first(arrayify);
    t.same(fn(), []);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1]);
    t.same(fn(1,2,3), [1]);

    t.end();
});

