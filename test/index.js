"use strict";

var test = require('tape');
var bind = require('..');

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

    t.same(bind('fn', o)(), o, 'fn is specified by name');
    t.same(bind(o.fn, null)(), null, 'bind Null');
    t.same(bind(o.fn, undefined)(), undefined, 'bind Undefined');
    t.same(bind(o.fn, 1)(), 1, 'bind Number');
    t.same(bind(o.fn, '1')(), '1', 'bind String');
    t.same(bind(o.fn, true)(), true, 'bind Boolean');
    t.same(bind(o.fn, c)(), c, 'bind Object');
    t.same(bind(o.fn).call(c), c, 'use the calling context');

    t.end();
});

test('xargs', function (t) {
    var fn = bind(arrayify).xargs();
    t.same(fn(), []);
    t.same(fn(1), []);
    t.same(fn(1,2), []);

    fn = bind(arrayify).xargs(1);
    t.same(fn(), [undefined]);
    t.same(fn(1), [undefined]);
    t.same(fn(1,2), [2]);

    fn = bind(arrayify).xargs(1,2);
    t.same(fn(), [undefined, undefined]);
    t.same(fn(1), [undefined, undefined]);
    t.same(fn(1,2), [2, undefined]);
    t.same(fn(1,2,3), [2,3]);

    fn = bind(arrayify).xargs([1,2]);
    t.same(fn(), [undefined, undefined]);
    t.same(fn(1), [undefined, undefined]);
    t.same(fn(1,2), [2, undefined]);
    t.same(fn(1,2,3), [2,3]);

    t.end();
});

test('push', function (t) {
    var fn = bind(arrayify).push(1,2);
    t.same(fn(), [1,2]);
    t.same(fn(0), [0,1,2]);
    t.same(fn(0,1), [0,1,1,2]);

    t.end();
});

test('pop', function (t) {
    var fn = bind(arrayify).pop();
    t.same(fn(), []);
    t.same(fn(0), []);
    t.same(fn(0,1), [0]);

    t.end();
});

test('shift', function (t) {
    var fn = bind(arrayify).shift();
    t.same(fn(), []);
    t.same(fn(0), []);
    t.same(fn(0,1), [1]);

    t.end();
});

test('unshift', function (t) {
    var fn = bind(arrayify).unshift(1,2);
    t.same(fn(), [1,2]);
    t.same(fn(0), [1,2,0]);
    t.same(fn(0,1), [1,2,0,1]);

    t.end();
});

test('slice', function (t) {
    var fn = bind(arrayify).slice(1,2);
    t.same(fn(), []);
    t.same(fn(0), []);
    t.same(fn(0,1), [1]);
    t.same(fn(0,1,2), [1]);

    t.end();
});

test('splice', function (t) {
    var fn = bind(arrayify).splice(1,1,2,3);
    t.same(fn(), [2,3]);
    t.same(fn(0), [0,2,3]);
    t.same(fn(0,1), [0,2,3]);
    t.same(fn(0,1,2), [0,2,3,2]);

    t.end();
});

test('filter', function (t) {
    var fn = bind(arrayify).xargs(1,2).filter(Boolean);
    t.same(fn(), []);
    t.same(fn(0), []);
    t.same(fn(0,1), [1]);
    t.same(fn(0,1,2), [1,2]);
    t.same(fn(0,1,2,3), [1,2]);

    t.end();
});

test('map', function (t) {
    var fn = bind(arrayify).map(Number).filter(function (n) {
        return n == n;
    });
    t.same(fn(), []);
    t.same(fn('0'), [0]);
    t.same(fn('0', '1'), [0,1]);
    t.same(fn('0', '1', 'a'), [0,1]);

    t.end();
});

test('reduce', function (t) {
    var fn = bind(arrayify).reduce(function (o, arg, i) {
        o[0][i] = arg;
        return o;
    }, [{}]);
    t.same(fn(), [{}]);
    t.same(fn(0), [{0:0}]);
    t.same(fn(0, 1), [{0:0,1:1}]);
    t.same(fn(0, 1, 'a'), [{0:0,1:1,2:'a'}]);

    t.end();
});

test('first', function (t) {
    var fn = bind(arrayify).first();
    t.same(fn(), [undefined]);
    t.same(fn(0), [0]);
    t.same(fn(0, 1), [0]);

    t.end();
});

test('last', function (t) {
    var fn = bind(arrayify).last();
    t.same(fn(), [undefined]);
    t.same(fn(0), [0]);
    t.same(fn(0, 1), [1]);

    t.end();
});

