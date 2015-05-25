var test = require('tape');
var sbind = require('..').sbind;

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('sbind(f, o)', function (t) {
    var o = {};
    var f = sbind(function () {
        t.is(this, o);
    }, o);
    f();
    t.end();
});

test('sbind(f, null, start, 0, value)', function (t) {
    t.same(sbind(arrayify, null, 0, 0, 1)(2,3), [1,2,3]);
    t.same(sbind(arrayify, null, 1, 0, 1)(2,3), [2,1,3]);
    t.same(sbind(arrayify, null, 2, 0, 1)(2,3), [2,3,1]);
    t.end();
});

test('sbind(f, null, start, 0, value1, value2)', function (t) {
    t.same(sbind(arrayify, null, 0, 0, 1, 0)(2,3), [1,0,2,3]);
    t.same(sbind(arrayify, null, 1, 0, 1, 0)(2,3), [2,1,0,3]);
    t.same(sbind(arrayify, null, 2, 0, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});

test('sbind(f, null, start, deletecount, value1, value2)', function (t) {
    t.same(sbind(arrayify, null, 0, 1, 1, 0)(2,3), [1,0,3]);
    t.same(sbind(arrayify, null, 1, 1, 1, 0)(2,3), [2,1,0]);
    t.same(sbind(arrayify, null, 2, 1, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});

test('sbind("f", o, start, deletecount, value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    t.same(sbind('arrayify', o, 0, 1, 1, 0)(2,3), [1,0,3]);
    t.same(sbind('arrayify', o, 1, 1, 1, 0)(2,3), [2,1,0]);
    t.same(sbind('arrayify', o, 2, 1, 1, 0)(2,3), [2,3,1,0]);
    t.end();
});
