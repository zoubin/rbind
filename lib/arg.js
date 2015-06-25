var arrayify = require('arrayify-slice');

module.exports = function arg(index) {
    if (arguments.length > 1) {
        return arg(arrayify(arguments));
    }
    if (Array.isArray(index)) {
        return index.map(function (i) {
            return arg(i);
        });
    }
    return new Arg(index);
};
module.exports.parse = parse;

var FLAG = '__XBIND_ARG__';
function Arg(index) {
    this.index = index;
    this._xbind_arg = FLAG;
}

function parse(args, o) {
    args = args || [];
    if (!o) {
        return o;
    }
    if (Array.isArray(o)) {
        return o.map(function (v) {
            return parse(args, v);
        });
    }
    if (isArg(o)) {
        if (o.index == null) {
            return args.slice();
        }
        if (Array.isArray(o.index)) {
            return o.index.map(function (i) {
                return args[i];
            });
        }
        return args[+o.index || 0];
    }
    if (typeof o === 'object') {
        return Object.keys(o).reduce(function (ao, k) {
            ao[k] = parse(args, o[k]);
            return ao;
        }, {});
    }
    return o;
};

function isArg(o) {
    return o && o._xbind_arg === FLAG;
}
