var gulp = require('gulp')
var gulpif = require('gulp-if');
var concat = require('gulp-concat')
var cdnizer = require("gulp-cdnizer");
var removeCode = require('gulp-remove-code');
var del = require('del');

var demoMode = false;

gulp.task('clean', function () {
    del(['dist']);
});

gulp.task('js', function () {
    var src = ['www/js/**/app.js', 'www/js/**/translations.js', 'www/js/controllers/**/*.js', 'www/js/services/**/*.js', 'www/lib/angularjs-scroll-glue-Luegg/src/scrollglue.js'];

    if (demoMode) {
        src = src.concat('www/lib/angular-mocks/**/angular-mocks.js');
    }

    gulp.src(src)
        .pipe(concat('app.js'))
        .pipe(gulpif(!demoMode, removeCode({production: true})))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('stuff', function () {
    gulp.src(['www/index.html'])
        .pipe(removeCode({production: true}))
        .pipe(cdnizer([{
            file: 'lib/bootstrap-css-only/css/bootstrap.min.css',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css'
        }]))
        .pipe(cdnizer([{
            file: 'lib/angular/angular.min.js',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js'
        }]))
        .pipe(cdnizer([{
            file: 'lib/angular-sanitize/angular-sanitize.min.js',
            cdn: '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-sanitize.min.js'
        }]))
        .pipe(cdnizer([{
            file: 'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            cdn: '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.11.2/ui-bootstrap-tpls.min.js'
        }]))
        .pipe(cdnizer([{
            file: 'lib/angular-gettext/dist/angular-gettext.min.js',
            cdn: 'https://raw.githubusercontent.com/rubenv/angular-gettext/master/dist/angular-gettext.min.js'
        }]))
        .pipe(gulp.dest('dist'))

    gulp.src(['www/css/**/*.css'])
        .pipe(gulp.dest('dist/css'))

    gulp.src(['www/img/**/*.*'])
        .pipe(gulp.dest('dist/img'))
})

gulp.task('css', function () {
})

gulp.task('default', ['clean', 'js', 'stuff', 'css']);

gulp.task('demo', function () {
    demoMode = true;
    gulp.start('default');
})
