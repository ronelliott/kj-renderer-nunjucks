'use strict';

const is = require('is'),
      path = require('path');

module.exports = function($opts) {
    var ext = $opts.extension,
        base = $opts.path,
        env = $opts.env;

    return function(template, context, callback) {
        template = is.array(template) ? path.join.apply(null, template) : template;
        var templatePath = (template.indexOf(ext) === -1) ? template + ext : template;
        templatePath = path.resolve(base, templatePath);
        env.render(templatePath, context, callback);
    };
};
