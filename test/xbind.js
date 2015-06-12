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

test('xbind(ctx, f)', function (t) {
    var o = {};

    var f = xbind(o, function () {
        t.is(this, o);
    });
    f();

    f = xbind(function () {
        t.is(this, o);
    });
    f.call(o);

    f = xbind(null, function () {
        t.same(this, null);
    });
    f.call(o);

    f = xbind(function () {
        t.same(this, 1);
    });
    f.call(1);

    t.end();
});

test('xbind(start, f)', function (t) {
    t.same(xbind(arrayify)(2,3), []);
    t.same(xbind(1, arrayify)(2,3), [2]);
    t.same(xbind(2, arrayify)(2,3), [2,3]);
    t.end();
});

test('xbind(start, f, value)', function (t) {
    t.same(xbind(arrayify, 1)(2,3), [1]);
    t.same(xbind(1, arrayify, 1)(2,3), [2,1]);
    t.same(xbind(2, arrayify, 1)(2,3), [2,3,1]);
    t.end();
});

test('xbind(start, f, value1, value2)', function (t) {
    t.same(xbind(arrayify, 1, 0)(2,3), [1,0]);
    t.same(xbind(1, arrayify, 1, 0)(2,3), [2,1,0]);
    t.same(xbind(2, arrayify, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});

test('xbind(start, ctx, "f", value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    t.same(xbind(o, 'arrayify', 1, 0)(2,3), [1,0]);
    t.same(xbind(1, o, 'arrayify', 1, 0)(2,3), [2,1,0]);
    t.same(xbind(2, o, 'arrayify', 1, 0)(2,3), [2,3,1,0]);
    t.end();
});
