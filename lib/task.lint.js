/**
 * Author: Jeff Whelpley
 * Date: 1/20/15
 *
 * Use jshint to lint the code
 */
var jshint      = require('gulp-jshint');
var jshintOpts  = require('./opts.jshint');

module.exports = function (gulp, opts) {
    var allCode = [
        opts.testCode || 'test/**/*.js',
        opts.targetCode || 'lib/**/*.js'
    ];

    return function () {
        return gulp.src(allCode)
            .pipe(jshint(jshintOpts))
            .pipe(jshint.reporter('default'));
    };
};
