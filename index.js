var arrayify = require('arrayify-slice');
var transforms = require('./lib/transforms.js');

module.exports = bind;
module.exports.identity = require('./lib/identity.js');

function bind(f, c) {
    var hasCtx = arguments.length > 1;
    var ctx = arguments[1];
    var trs = [];

    var xfn = function xfn() {
        var c = hasCtx ? ctx : this;
        var fn = typeof f === 'string' ? c[f] : f;
        return fn.apply(c, transform(arguments));
    }
    xfn.xargs = function (o) {
        trs.push([function () {
            var fnArgs = this;
            return arrayify(arguments).map(function (i) {
                return fnArgs[i];
            });
        }, Array.isArray(o) ? o : arguments]);
        return this;
    };
    Object.keys(transforms).forEach(function (k) {
        var tr = transforms[k];
        xfn[k] = function () {
            trs.push([tr, arguments]);
            return this;
        };
    });

    function transform(args) {
        return trs.reduce(function (args, tr) {
            return tr[0].apply(args, tr[1] || []);
        }, arrayify(args));
    }

    return xfn;
}

