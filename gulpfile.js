var gulp = require('gulp');
var fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
	require('./gulp/' + task);
});


gulp.task('watch:js',['js'],function () {
	gulp.watch('ng/**/*.js', ['js']);
});
gulp.task('watch:css',['css'], function () {
	gulp.watch('css/**/*.styl', ['css']);
});

gulp.task('dev', ['watch:css','watch:js','dev:server']);