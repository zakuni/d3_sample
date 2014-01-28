var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');

gulp.task('jade', function() {
  gulp.src('*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./'))
}); 

gulp.task('coffee', function() {
  gulp.src('*.coffee')
    .pipe(coffee({sourceMap: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'))
});

gulp.task('default', function(){
  gulp.watch(['*.jade'], ['jade']);
  gulp.watch(['*.coffee'], ['coffee']);
});