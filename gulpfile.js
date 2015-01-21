/**
 * Author: Jeff Whelpley
 * Date: 2/9/14
 *
 * Build file for Pancakes
 */
var gulp    = require('gulp');
var batter  = require('./lib/batter');

batter.whip(gulp, {
    require:        require,
    rootDir:        __dirname,
    unitTargetCode: ['lib/*.js', 'build/*.js']
});
