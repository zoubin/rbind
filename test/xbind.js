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
    t.end();
});

test('xbind(f, start)', function (t) {
    t.same(xbind(arrayify, 0)(2,3), []);
    t.same(xbind(arrayify, 1)(2,3), [2]);
    t.same(xbind(arrayify, 2)(2,3), [2,3]);
    t.end();
});

test('xbind(f, start, value)', function (t) {
    t.same(xbind(arrayify, 0, 1)(2,3), [1]);
    t.same(xbind(arrayify, 1, 1)(2,3), [2,1]);
    t.same(xbind(arrayify, 2, 1)(2,3), [2,3,1]);
    t.end();
});

test('xbind(f, start, value1, value2)', function (t) {
    t.same(xbind(arrayify, 0, 1, 0)(2,3), [1,0]);
    t.same(xbind(arrayify, 1, 1, 0)(2,3), [2,1,0]);
    t.same(xbind(arrayify, 2, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});

test('xbind(ctx, "f", start, value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    t.same(xbind(o, 'arrayify', 0, 1, 0)(2,3), [1,0]);
    t.same(xbind(o, 'arrayify', 1, 1, 0)(2,3), [2,1,0]);
    t.same(xbind(o, 'arrayify', 2, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});
