var arrayify = require('arrayify-slice');

module.exports = XArgs;

function XArgs(fn) {
    this.fn = fn;
    this.transforms = [];
}

XArgs.prototype.push = function() {
    return this.transform(push, arguments);
}

XArgs.prototype.pop = function() {
    return this.transform(pop);
}

XArgs.prototype.unshift = function() {
    return this.transform(unshift, arguments);
}

XArgs.prototype.shift = function() {
    return this.transform(shift);
}

XArgs.prototype.splice = function() {
    return this.transform(splice, arguments);
}

XArgs.prototype.slice = function() {
    return this.transform(slice, arguments);
}

XArgs.prototype.transform = function(fn, args) {
    if (Array.isArray(fn)) {
        this.transforms.push(fn);
    }
    else {
        this.transforms.push(arrayify(arguments));
    }
    return this;
}

XArgs.prototype.applyTransforms = function(fnArgs) {
    return this.transforms.reduce(function (fnArgs, tr) {
        return tr[0](fnArgs, tr[1]);
    }, arrayify(fnArgs));
}

XArgs.prototype.unwrap = function() {
    return this.fn;
}

function push(fnArgs, args) {
    fnArgs.push.apply(fnArgs, args);
    return fnArgs;
}

function pop(fnArgs) {
    return [fnArgs.pop()];
}

function unshift(fnArgs, args) {
    fnArgs.unshift.apply(fnArgs, args);
    return fnArgs;
}

function shift(fnArgs) {
    return [fnArgs.shift()];
}

function splice(fnArgs, args) {
    fnArgs.splice.apply(fnArgs, args);
    return fnArgs;
}

function slice(fnArgs, args) {
    return fnArgs.slice.apply(fnArgs, args);
}

