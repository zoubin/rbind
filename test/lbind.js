var test = require('tape');
var lbind = require('..').lbind;

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('lbind(ctx, f)', function (t) {
    var o = {};
    var f = lbind(o, function () {
        t.is(this, o);
    });
    f();
    t.end();
});

test('lbind(end, f, value1)', function (t) {
    var rarrayify = lbind(arrayify, 1);
    t.same(rarrayify(2,3), [1,2,3]);
    rarrayify = lbind(1, arrayify, 1);
    t.same(rarrayify(2,3), [1,2]);
    t.end();
});

test('lbind(end, f, value1, value2)', function (t) {
    var rarrayify = lbind(arrayify, 1, 2);
    t.same(rarrayify(3,4), [1,2,3,4]);
    rarrayify = lbind(1, arrayify, 1, 2);
    t.same(rarrayify(3,4), [1,2,3]);
    t.end();
});

test('lbind(end, ctx, "f", value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    var rarrayify = lbind(o, 'arrayify', 1, 2);
    t.same(rarrayify(3,4), [1,2,3,4]);
    t.end();
});

