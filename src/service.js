var Router = require('./router');

exports.create = function(el, View, routes) {
    var url = weex.config.bundleUrl;
    var router = new Router({ url: url, routes: routes });

    Vue.prototype.$router = router;
    Vue.prototype.$route = router.route;

    new Vue({
        el: el,
        render: function(h) {
            return h(View);
        }
    });
};