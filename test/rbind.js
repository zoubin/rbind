var test = require('tape');
var rbind = require('..').rbind;

function arrayify() {
    var ret = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        ret.push(arguments[i]);
    }
    return ret;
}

test('rbind(f, o)', function (t) {
    var o = {};
    var f = rbind(function () {
        t.is(this, o);
    }, o);
    f();
    t.end();
});

test('rbind(f, null, value1)', function (t) {
    var rarrayify = rbind(arrayify, null, 1);
    t.same(rarrayify(2,3), [2,3,1]);
    t.end();
});

test('rbind(f, null, value1, value2)', function (t) {
    var rarrayify = rbind(arrayify, null, 1, 2);
    t.same(rarrayify(3,4), [3,4,1,2]);
    t.end();
});

test('rbind("f", o, value1, value2)', function (t) {
    var o = { arrayify: arrayify };
    var rarrayify = rbind('arrayify', o, 1, 2);
    t.same(rarrayify(3, 4), [3,4,1,2]);
    t.end();
});
