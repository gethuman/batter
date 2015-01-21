/**
 * Author: Jeff Whelpley
 * Date: 1/20/15
 *
 * Simple watch implementation
 */
module.exports = function (gulp, opts) {
    var watchCode = opts.watchCode || ['lib/**/*.js', 'test/unit/**/*.js'];

    return function () {
        gulp.watch(watchCode, ['jshint', 'test']);
    };
};