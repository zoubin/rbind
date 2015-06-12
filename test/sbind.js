var test = require('tape');
var sbind = require('..');

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('sbind(ctx, f)', function (t) {
    var o = {};
    var f = sbind(o, function () {
        t.is(this, o);
    });
    f();
    t.end();
});

test('sbind(start, f, value)', function (t) {
    t.same(sbind(0, arrayify, 1)(2,3), [1]);
    t.same(sbind(1, arrayify, 1)(2,3), [2,1]);
    t.same(sbind(2, arrayify, 1)(2,3), [2,3,1]);
    t.end();
});

test('sbind(start, deletecount, f, value1, value2)', function (t) {
    t.same(sbind(0, 0, arrayify, 1, 0)(2,3), [1,0,2,3]);
    t.same(sbind(1, 0, arrayify, 1, 0)(2,3), [2,1,0,3]);
    t.same(sbind(2, 0, arrayify, 1, 0)(2,3), [2,3,1,0]);
    t.same(sbind(0, 1, arrayify, 1, 0)(2,3), [1,0,3]);
    t.same(sbind(1, 1, arrayify, 1, 0)(2,3), [2,1,0]);
    t.same(sbind(2, 1, arrayify, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});

test('sbind(start, deletecount, ctx, "f", value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    t.same(sbind(0, 1, o, 'arrayify', 1, 0)(2,3), [1,0,3]);
    t.same(sbind(1, 1, o, 'arrayify', 1, 0)(2,3), [2,1,0]);
    t.same(sbind(2, 1, o, 'arrayify', 1, 0)(2,3), [2,3,1,0]);
    t.end();
});
