/**
 * Author: Jeff Whelpley
 * Date: 1/20/15
 *
 * Use jshint to lint the code
 */
var jshint      = require('gulp-jshint');
var jshintOpts  = require('./opts.jshint');

module.exports = function (gulp, opts) {
    var lintCode = opts.lintCode || [].concat(opts.unitTestCode, opts.unitTargetCode);

    return function () {
        return gulp.src(lintCode)
            .pipe(jshint(jshintOpts))
            .pipe(jshint.reporter('default'));
    };
};
