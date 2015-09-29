'use strict';

var extend = require('extend'),
    path = require('path'),
    prequire = require('parent-require'),
    render = require('./renderer');

module.exports = function($opts) {
    $opts = extend(true, {}, {
        enabled: true,
        extension: '.html',
        inject: '$render',
        injectEnv: '$renderEnv',
        path: path.resolve(process.cwd(), 'views'),
        options: {
            watch: false
        }
    }, $opts);

    return function($$resolver) {
        var nunjucks = $$resolver('$nunjucks') || prequire('nunjucks');

        if ($opts.enabled) {
            $opts.env = $opts.env || nunjucks.configure($opts.options);

            var filtersCfg = $opts.filters || {};

            Object.keys(filtersCfg)
                .forEach(function(name) {
                    var filter = filtersCfg[name];
                    $opts.env.addFilter(name, filter);
                });


            $$resolver.add('$nunjucks', nunjucks);

            if ($opts.inject) {
                $$resolver.add($opts.inject, render($opts));
            }

            if ($opts.injectEnv) {
                $$resolver.add($opts.injectEnv, $opts.env);
            }
        }
    };
};
