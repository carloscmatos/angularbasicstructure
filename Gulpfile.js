var gulp = require('gulp');
var rename = require("gulp-rename");
var parallelize = require("concurrent-transform");
var merge = require('merge-stream');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var cdnizer = require("gulp-cdnizer");
var gutil = require('gulp-util');
var Slack = require('node-slack');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var sourcemaps = require('gulp-sourcemaps');

var slack_config = {
  hook_url: 'https://hooks.slack.com/services/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'
};
var env_config = process.env;

var rev_manifest = gulp.src("./dist/rev-manifest.json");
var slack = new Slack(slack_config.hook_url);

gulp.task('build_all', ['build_js', 'build_css', 'build_fonts', 'build_html', 'build_img'])

gulp.task('build_img', function() {
    // copy images to dist
    return gulp.src([
        "./client/assets/img/**/*.*",
    ])
    .pipe(gulp.dest("./dist/assets/img")); 

});

/* COMPRESS JS/CSS FILES */
gulp.task('build_js', function() {
    return gulp.src([
        'client/bower_components/jquery/dist/jquery.min.js', 
        'client/bower_components/angular/angular.min.js',     
        'client/bower_components/angular-ui-router/release/angular-ui-router.min.js', 
        'client/bower_components/angular-resource/angular-resource.min.js', 
        'client/bower_components/angularjs-slider/dist/rzslider.min.js', 
        'client/bower_components/slick-carousel/slick/slick.js', 
        'client/bower_components/angular-slick-carousel/dist/angular-slick.min.js', 
        'client/bower_components/angular-sanitize/angular-sanitize.min.js', 
        'client/bower_components/angular-md5/angular-md5.min.js', 
        'client/bower_components/angular-cdn-src/dist/js/angular-cdn-src.min.js', 
        'client/bower_components/angular-environment/dist/angular-environment.min.js',
        'client/assets/libs/angular-locale_pt-br.js',
        'client/assets/libs/jquery.scrollbar.js',           
        'client/app/**/*.js'            
    ])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('build_css', function() {
    return gulp.src([
        'client/assets/css/*.css'
    ])
    .pipe(sourcemaps.init())
      .pipe(concat('app.css'))
      .pipe(cleanCSS({
          compatibility: '*',
          processImport: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('build_html', function() {
    return gulp.src([
        "./client/**/*.html", 
        "!./client/bower_components/**/*.*"
    ])
    .pipe(gulp.dest('./dist'));
});

gulp.task('build_fonts', function() {
    return gulp.src([
        "./client/assets/fonts/*.*", 
    ])
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('watch',function(){
    gulp.watch('client/**/*.html', ['build_html']);
    gulp.watch('client/assets/fonts/*.*', ['build_fonts']);
    gulp.watch('client/assets/css/*.css', ['build_css']);
    gulp.watch('client/assets/img/*.*', ['build_img']);
    gulp.watch('client/app/**/*.js', ['build_js']);

});