var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');

dust.loadSource(dust.compile(require('./template'), 'www-home'));

module.exports = function (ctx, container, options, done) {
    var sandbox = container.sandbox;
    dust.render('www-home', serand.pack({
        autos: utils.resolve('autos://'),
        realestates: utils.resolve('realestates://'),
        classifieds: utils.resolve('classifieds://')
    }, container), function (err, out) {
        if (err) {
            return done(err);
        }
        sandbox.append(out);
        done(null, function () {
            $('.www-home', sandbox).remove();
        });
    });
};
