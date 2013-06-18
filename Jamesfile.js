var james = require('james');
var cssmin = require('james-cssmin');
var uglify = require('james-uglify');


var inputRoot = 'dev/';
var outputRoot = 'public/';

james.task('default', ['watch']);
james.task('build', build);
james.task('watch', watch);
james.task('minify_css', minifyCSS);
james.task('minify_js', minifyJS);

function build() {
    minifyCSS();
    minifyJS();
}

function watch() {
    james.watch(inputRoot + '**/*.css', minifyCSS);
    james.watch(inputRoot + '**/*.js', minifyJS);
}

function minifyCSS() {
    var cssTarget = james.dest(outputRoot + 'css/all.css');

    james.read(inputRoot + 'css/vendor/normalize.css').write(cssTarget);
    james.read(inputRoot + 'css/vendor/foundation.css').write(cssTarget);
    james.read(inputRoot + 'css/vendor/jquery.qtip.css').write(cssTarget);
    james.list(inputRoot + 'css/*.css').forEach(process);

    // TODO: figure out why the output doesn't work
    //james.read(cssTarget).transform(cssmin).write(cssTarget);

    function process(file) {
        james.read(file).write(cssTarget);
    }
}

function minifyJS() {
    var jsTarget = james.dest(outputRoot + 'js/main.js');

    james.list(inputRoot + 'js/**/*.js').forEach(function(file) {
        james.read(file).transform(uglify).write(jsTarget);
    });
}