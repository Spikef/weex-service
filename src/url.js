module.exports = function(url) {
    var req = {
        protocol: '',
        host: '',
        port: '',
        href: '',
        origin: '',
        pathname: '',
        filename: ''
    };

    req.href = url;

    url = url.replace(/[?#].+/, '');

    var parts;

    parts = url.split('//');
    if (/^(http|https|ftp|file):$/.test(parts[0])) {
        req.protocol = parts.shift();
        url = parts.join('/');
    }

    parts = url.split('/');
    req.origin = parts.shift();
    req.filename = parts.pop();
    req.pathname = parts.join('/');
    req.pathname = '/' + req.pathname;

    parts = req.origin.split(':');
    req.host = parts.shift();

    if (parts[0]) req.port = parts[0];

    if (req.protocol) req.origin = req.protocol + '//' + req.origin;

    return req;
};