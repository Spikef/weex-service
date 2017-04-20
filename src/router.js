var qs = require('qs');
var ps = require('./path');
var Url = require('./url');
var utils = require('./utils');

function Router(options) {
    var url = options.url;

    if (!url || !utils.isString(url)) {
        throw new Error('Missing required parameter url!');
    }

    url = url.replace(/\\/g, '/');

    var match;

    var data = splitUrl(url);
    if (options.routes) {
        this.routes = options.routes;
        if (data.hash) {
            var hash = data.hash.replace('#', '');
            if (hash) match = this.match(hash);
        }
    }

    this.route = this.parse({ url: url, data: data }, match);
}

Router.prototype.match = function (hash) {
    if (!this.routes || !this.routes.length) {
        throw new Error('No routes!');
    }

    for (var i = 0; i < this.routes.length; i++) {
        var route = this.routes[i];
        if (ps.match(hash, route.path)) {
            return route.path;
        }
    }
};

Router.prototype.push = function (route) {
    var navigator = weex.requireModule('navigator');
    var url = this.stringify(route);

    navigator.push({
        url: url,
        animated: 'true'
    }, function() {});
};

Router.prototype.back = function () {
    var navigator = weex.requireModule('navigator');
    navigator.pop();
};

// path || (params, query, name)
Router.prototype.stringify = function (route) {
    var url;

    var path = route.path || route.hash || '';
    var match = route.match || this.route.match;
    if (!path && match && route.params) {

    }

    return url;
};

Router.prototype.parse = function (url, match) {
    var data;
    if (typeof url === 'object') {
        data = url.data;
        url = url.url;
    }

    url = url.replace(/\\/g, '/');

    if (!data) data = splitUrl(url);

    var route = {
        originUrl: url,
        baseUrl: data.baseUrl,
        host: '',
        protocol: '',
        port: '',
        pathname: '',
        filename: '',
        name: '',
        extension: '',
        hash: data.hash,
        path: '',
        search: data.search,
        match: match || '',
        query: {},
        params: {}
    };

    if (route.baseUrl) {
        var req = Url(route.baseUrl);

        route.baseUrl = req.origin + req.pathname;

        route.protocol = req.protocol;
        route.host = req.host;
        route.port = req.port;
        route.pathname = req.pathname;
        route.filename = req.filename;

        var file = utils.parseFileName(req.filename);
        route.name = file.name;
        route.extension = file.extension;
    }

    if (route.search) {
        route.search = utils.resolveSearch(route.search);
        route.query = qs.parse(utils.removeQuestion(route.search));
    }

    if (route.hash) {
        route.path = route.hash.replace(/^#/, '');

        if (match) {
            route.params = ps.parse(route.path, match);
        }
    }

    return route;
};

function splitUrl(url) {
    var baseUrl = '';
    var search = '';
    var hash = '';
    var parts = url.split(/(?=[?#])/);
    parts.forEach(function (p) {
        if (/^\?/.test(p)) {
            search += '&' + utils.removeQuestion(utils.removeSlash(p));
        } else if (/#/.test(p)) {
            hash += utils.removeSlash(p);
        } else {
            baseUrl += p;
        }
    });

    return { baseUrl: baseUrl, search: search, hash: hash };
}

module.exports = Router;