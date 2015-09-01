'use strict';

var should = require('should'),
    sinon = require('sinon'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    proxyquire = require('proxyquire'),
    render = require('../renderer'),
    otherViewsBase = path.resolve(__dirname, 'views', 'other'),
    viewsBase = path.resolve(__dirname, 'views');

describe('render', function() {
    beforeEach(function() {
        this.env = nunjucks;
    });

    it('should use the configured extension', function(done) {
        var opts = { extension: '.haha', path: viewsBase, env: this.env };
        render(opts)('index', {}, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('haha\n');
            done();
        });
    });

    it('should use the configured path', function(done) {
        var opts = { extension: '.html', path: otherViewsBase, env: this.env };
        render(opts)('other', {}, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('other\n');
            done();
        });
    });

    it('should join the strings if an array is given as the template', function(done) {
        var opts = { extension: '.html', path: viewsBase, env: this.env };
        render(opts)([ 'other', 'other' ], {}, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('other\n');
            done();
        });
    });

    it('should append the extension if the given template does not have it', function(done) {
        var opts = { extension: '.html', path: viewsBase, env: this.env };
        render(opts)('yup.htm', {}, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('yup\n');
            done();
        });
    });

    it('should resolve the template path', function(done) {
        var spy = sinon.spy(path.resolve),
            opts = { extension: '.html', path: viewsBase, env: this.env },
            prender = proxyquire('../renderer', { 'path': { resolve: spy } });
        prender(opts)('index', {}, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('index\n');
            spy.called.should.equal(true);
            done();
        });
    });

    it('should use the given context', function(done) {
        var opts = { extension: '.html', path: viewsBase, env: this.env };
        render(opts)('context', { foo: 'foo' }, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('foo\n');
            done();
        });
    });

    it('should render the template', function(done) {
        var opts = { extension: '.html', path: viewsBase, env: this.env };
        render(opts)('index', {}, function(err, data) {
            should(err).not.be.ok();
            should(data).equal('index\n');
            done();
        });
    });
});
