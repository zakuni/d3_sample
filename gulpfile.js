var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('*.coffee')
    .pipe(coffee({sourceMap: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'))
});

gulp.task('default', function(){
  gulp.watch(['*.coffee'], ['coffee']);
});