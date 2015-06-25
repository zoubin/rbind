module.exports = identity;

function identity(o) {
    return function () {
        return o;
    };
}

