/**
 * Copyright 2014 GetHuman LLC
 * Author: Jeff Whelpley
 * Date: 1/20/15
 *
 * Gulp task for clearing out the dist folder
 */
var clean = require('gulp-clean');

module.exports = function (gulp, opts) {
    var distDir = opts.distDir || 'dist';

    return function () {
        return gulp.src(distDir + '/*')
            .pipe(clean({ read: false}));
    };
};