// 加载gulp核心
var gulp = require('gulp');

// 压缩插件
var uglify = require('gulp-uglify');

// 检查js代码插件
// var jshint = require('gulp-jshint');

// 重命名
var rename = require('gulp-rename');



// 压缩代码
gulp.task('compress', function() {
    gulp.src('setColor.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

// 重命名
gulp.task('rename', function() {
    gulp.src('./build/setColor.js')
        .pipe(rename('setColor.min.js'))
        .pipe(gulp.dest('build'));
});



// 默认任务
gulp.task('default', function(){
    gulp.run('compress');
    gulp.run('rename');
    // 监听文件变化
    gulp.watch('setColor.js', function(){
        gulp.run('compress');
        gulp.run('rename');
    });
});