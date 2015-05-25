var test = require('tape');
var xbind = require('..');

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('xbind(f, o)', function (t) {
    var o = {};
    var f = xbind(function () {
        t.is(this, o);
    }, o);
    f();
    t.end();
});

test('xbind(f, null, start)', function (t) {
    t.same(xbind(arrayify, null, 0)(2,3), []);
    t.same(xbind(arrayify, null, 1)(2,3), [2]);
    t.same(xbind(arrayify, null, 2)(2,3), [2,3]);
    t.end();
});

test('xbind(f, null, start, value)', function (t) {
    t.same(xbind(arrayify, null, 0, 1)(2,3), [1]);
    t.same(xbind(arrayify, null, 1, 1)(2,3), [2,1]);
    t.same(xbind(arrayify, null, 2, 1)(2,3), [2,3,1]);
    t.end();
});

test('xbind(f, null, start, value1, value2)', function (t) {
    t.same(xbind(arrayify, null, 0, 1, 0)(2,3), [1,0]);
    t.same(xbind(arrayify, null, 1, 1, 0)(2,3), [2,1,0]);
    t.same(xbind(arrayify, null, 2, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});

test('xbind("f", o, start, value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    t.same(xbind('arrayify', o, 0, 1, 0)(2,3), [1,0]);
    t.same(xbind('arrayify', o, 1, 1, 0)(2,3), [2,1,0]);
    t.same(xbind('arrayify', o, 2, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});
