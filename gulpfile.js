var gulp = require('gulp'),
    server = require('gulp-server-livereload');

gulp.task('webserver', function () {
    gulp.src('app/')
        .pipe(server({
            livereload: true,
            open: true
        }));
});


gulp.task('default', ['webserver']);