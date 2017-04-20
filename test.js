var Router = require('./src/router');

var router = new Router('http://www.new.com:8088/a/b/app.weex.js?q=123/#/c/d/1?c=10', '/c/:test/:id');

console.log(router.route);

console.log(router.parse('www.new.com/a/b/app.weex.js?q=123/#/c/d/1?c=10', '/c/:test/:id'))

var qs = require('qs');

console.log(qs.stringify({
    a: 100,
    b: [1, 2]
}));