exports.isString = function() {
    var args = Array.prototype.slice.call(arguments);
    var result = [];
    args.forEach(function (str) {
        result.push(typeof str === 'string');
    });

    switch (result.length) {
        case 0:
            return false;
        case 1:
            return result[0];
        default:
            return result;
    }
};

exports.removeSlash = function(str) {
    if (this.isString(str)) {
        return str.replace(/\/$/, '');
    }

    return str;
};

exports.removeQuestion = function(str) {
    if (this.isString(str)) {
        return str.replace(/^\?/, '');
    }

    return str;
};

exports.resolveSearch = function(str) {
    if (this.isString(str)) {
        return str.replace(/^&/, '?');
    }

    return str;
};

exports.parseFileName = function(str) {
    var ret = {
        name: '',
        extension: ''
    };

    if (this.isString(str)) {
        var parts = str.split('.');
        ret.name = parts.shift();
        ret.extension = parts.join('.');
    }

    return ret;
};