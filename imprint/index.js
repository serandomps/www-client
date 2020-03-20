var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');

dust.loadSource(dust.compile(require('./template'), 'www-imprint'));

module.exports = function (ctx, container, options, done) {
    var sandbox = container.sandbox;
    dust.render('www-imprint', serand.pack({}, container), function (err, out) {
        if (err) {
            return done(err);
        }
        sandbox.append(out);
        done(null, function () {
            $('.www-imprint', sandbox).remove();
        });
    });
};
