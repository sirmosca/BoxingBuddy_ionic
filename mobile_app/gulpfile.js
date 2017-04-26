var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var iife = require("gulp-iife");

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('build', function() {
  return gulp.src([
      'www/lib/polyfill/SpeechSynthesisUtterance.js',
      'www/lib/jquery/jquery.min.js',
      'www/lib/bootstrap/bootstrap.min.js',
      'www/lib/angular/angular-ui-router.min.js',
      'www/lib/ionic/ionic.min.js',
      'www/lib/ionic/ionic-angular.min.js',
      'www/app/app.module.js',
      'www/app/app.config.js',
      'www/app/app.run.js',
      'www/app/app.animations.js',
      'www/app/core/core.module.js',
      'www/app/core/speech/speech.module.js',
      'www/app/core/speech/speech.service.js',
      'www/app/core/settings/settings.module.js',
      'www/app/core/settings/settings.service.js',
      'www/app/core/combination/combination.module.js',
      'www/app/core/combination/combination.service.js',
      'www/app/glossary-view/glossary-view.module.js',
      'www/app/glossary-view/glossary-view.component.js',
      'www/app/boxing-match-view/boxing-match-view.module.js',
      'www/app/boxing-match-view/boxing-match-view.component.js',
      'www/app/main-view/main-view.module.js',
      'www/app/main-view/main-view.component.js',
      'www/app/settings-view/settings-view.module.js',
      'www/app/settings-view/settings-view.component.js',
      'www/app/combo-teaching-view/combo-teaching-view.module.js',
      'www/app/combo-teaching-view/combo-teaching-view.component.js'])
    .pipe(iife({prependSemicolon: false, useStrict: true}))
    //.pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('www/dist'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
