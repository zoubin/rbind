"use strict";

var test = require('tape');
var xbind = require('..');

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('context', function (t) {
    var o = {
        fn: function () {
            return this;
        }
    };
    var c = {};

    t.same(xbind('fn', o)(), o, 'fn is specified by name');
    t.same(xbind(o.fn, null)(), null, 'bind Null');
    t.same(xbind(o.fn, undefined)(), undefined, 'bind Undefined');
    t.same(xbind(o.fn, 1)(), 1, 'bind Number');
    t.same(xbind(o.fn, '1')(), '1', 'bind String');
    t.same(xbind(o.fn, true)(), true, 'bind Boolean');
    t.same(xbind(o.fn, c)(), c, 'bind Object');
    t.same(xbind(o.fn).call(c), c, 'use the calling context');

    t.end();
});

test('push', function (t) {
    var fn = xbind(arrayify).xargs.push(2, 3).unwrap();

    t.same(fn(), [2,3]);
    t.same(fn(1), [1,2,3]);
    t.same(fn(1,2), [1,2,2,3]);

    t.end();
});

test('pop', function (t) {
    var fn = xbind(arrayify).xargs.pop().unwrap();

    t.same(fn(), [undefined]);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [2]);

    t.end();
});

test('unshift', function (t) {
    var fn = xbind(arrayify).xargs.unshift(2,3).unwrap();

    t.same(fn(), [2,3]);
    t.same(fn(1), [2,3,1]);
    t.same(fn(1,2), [2,3,1,2]);

    t.end();
});

test('shift', function (t) {
    var fn = xbind(arrayify).xargs.shift().unwrap();

    t.same(fn(), [undefined]);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1]);

    t.end();
});

test('slice', function (t) {
    var fn = xbind(arrayify).xargs.slice().unwrap();
    t.same(fn(), []);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1,2]);

    fn = xbind(arrayify).xargs.slice(1).unwrap();
    t.same(fn(), []);
    t.same(fn(1), []);
    t.same(fn(1,2), [2]);

    fn = xbind(arrayify).xargs.slice(1,3).unwrap();
    t.same(fn(), []);
    t.same(fn(1), []);
    t.same(fn(1,2), [2]);
    t.same(fn(1,2,3), [2,3]);
    t.same(fn(1,2,3,4,5), [2,3]);

    t.end();
});

test('splice', function (t) {
    var fn = xbind(arrayify).xargs.splice(1,0,1,2).unwrap();
    t.same(fn(), [1,2]);
    t.same(fn(1), [1,1,2]);
    t.same(fn(1,2), [1,1,2,2]);

    fn = xbind(arrayify).xargs.splice(1).unwrap();
    t.same(fn(), []);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1]);

    fn = xbind(arrayify).xargs.splice(1, undefined).unwrap();
    t.same(fn(), []);
    t.same(fn(1), [1]);
    t.same(fn(1,2), [1,2]);

    t.end();
});

test('combine', function(t) {
    var fn = xbind(arrayify).xargs.push(1).unshift(2).unwrap();
    t.same(fn(3), [2,3,1], 'push and unshift');

    fn = xbind(arrayify).xargs.pop().push(2,3).unwrap();
    t.same(fn(4,1), [1,2,3], 'pop and push');

    t.end();
})
