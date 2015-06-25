"use strict";

var test = require('tape');
var arg = require('../lib/arg.js');
var parse = arg.parse;

test('parse native', function(t) {
    var args = [0,1,2,3];
    t.equal(
        parse(args, 0),
        0,
        'Number'
    );
    t.equal(
        parse(args, 'abc'),
        'abc',
        'String'
    );
    t.equal(
        parse(args, true),
        true,
        'Boolean'
    );
    t.equal(
        parse(args, null),
        null,
        'Null'
    );
    t.equal(
        parse(args, undefined),
        undefined,
        'Undefined'
    );
    var f = function () {};
    t.equal(
        parse(args, f),
        f,
        'Function'
    );
    t.same(
        parse(args, [1,2]),
        [1,2],
        'Array'
    );
    t.same(
        parse(args, {x:1,y:2}),
        {x:1,y:2},
        'Object'
    );
    t.end();
})

test('parse Arg', function(t) {
    var args = [4,3,2,1];
    t.same(
        parse(args, arg()),
        args,
        'all'
    );
    t.equal(
        parse(args, arg(1)),
        args[1],
        '1'
    );
    t.same(
        parse(args, arg([1])),
        [args[1]],
        '[1]'
    );
    t.same(
        parse(args, arg(1,2)),
        [args[1], args[2]],
        '1,2'
    );
    t.same(
        parse(args, arg([1,2])),
        [args[1], args[2]],
        '[1,2]'
    );
    t.same(
        parse(args, {x:arg(1),y:arg(2)}),
        {x:args[1],y:args[2]},
        '{:1,:2}'
    );
    t.same(
        parse(args, {x:arg(1),y:{z:arg(2,3)}}),
        {x:args[1],y:{z:[args[2], args[3]]}},
        'deep'
    );
    t.end();
})

