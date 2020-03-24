const gulp = require("gulp");
const concat = require("gulp-concat");

return gulp
  .src("./static/css/*.css")
  .pipe(concat("main.css"))
  .pipe(gulp.dest("./static/css/"));
