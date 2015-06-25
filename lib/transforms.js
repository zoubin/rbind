
module.exports = {
    first: function () {
        return [this[0]];
    },
    last: function () {
        return [this[this.length - 1]];
    },
    reduce: function (fn, ini) {
        return this.reduce(fn, ini);
    },
    filter: function (fn) {
        return this.filter(fn);
    },
    map: function (fn) {
        return this.map(fn);
    },
    push: function () {
        this.push.apply(this, arguments);
        return this;
    },
    pop: function () {
        this.pop();
        return this;
    },
    shift: function () {
        this.shift();
        return this;
    },
    unshift: function () {
        this.unshift.apply(this, arguments);
        return this;
    },
    slice: function () {
        return this.slice.apply(this, arguments);
    },
    splice: function () {
        this.splice.apply(this, arguments);
        return this;
    },
};

