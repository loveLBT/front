var gulp = require('gulp'),
	cssmin = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	connect=require('gulp-connect'),//服务配置，可自动刷新
	port=process.env.port || 3000;
   
gulp.task('cssmin',function(){
	gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(rename({ extname:'.min.css'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

gulp.task('jsmin', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ extname:'.min.js'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('html',function(){
	gulp.src('administration/**/*.html')
		.pipe(connect.reload());
})

gulp.task('connect',function(){
	return connect.server({
		port:port,
		root:'./',
		livereload:true
	})
})

gulp.task('watch',function(){
	gulp.watch('src/css/*.css',['cssmin']);
	gulp.watch('src/js/*.js',['jsmin']);
	gulp.watch('administration/**/*.html',['html']);
});

gulp.task('default',['cssmin','jsmin','html','connect','watch']);


