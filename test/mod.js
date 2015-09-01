'use strict';

var should = require('should'),
    sinon = require('sinon'),
    mod = require('..'),
    path = require('path'),
    proxyquire = require('proxyquire'),
    reflekt = require('reflekt');

describe('mod', function() {
    it('should inject the render function if it is both enabled and inject is defined', function() {
        var resolver = new reflekt.ObjectResolver();
        mod({ enabled: true, inject: 'render' })(resolver);
        should(resolver('render')).be.Function();
    });

    it('should define default options', function() {
        var spy = sinon.spy(),
            pmod = proxyquire('..', { './renderer': spy }),
            resolver = new reflekt.ObjectResolver();
        pmod()(resolver);

        var arg = spy.lastCall.args[0];
        arg.should.have.property('enabled', true);
        arg.should.have.property('extension', '.html');
        arg.should.have.property('inject', '$render');
        arg.should.have.property('path', path.resolve(process.cwd(), 'views'));
        arg.should.have.property('options');
        arg.options.should.have.property('watch', false);
    });
});
