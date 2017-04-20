var path = require('path-to-regexp');

exports.match = function (input, match) {
    if (!input || !match) return false;

    var keys = [];
    var re = path(match, keys);
    var arr = re.exec(input, match);
    return arr && arr.length;
};

exports.parse = function (input, match) {
    var params = {};
    if (!input || !match) return params;

    var keys = [];
    var re = path(match, keys);
    var arr = re.exec(input, match);

    if (arr) {
        keys.forEach(function(d, i) {
            var name = d.name;
            var value = arr[i + 1];
            if (typeof value !== 'undefined') {
                params[name] = value;
            }
        });
    }

    return params;
};

exports.stringify = function (params, match) {

};