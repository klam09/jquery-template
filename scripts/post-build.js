const path    = require('path'),
      replace = require('replace-in-file');

replace.sync({
    files: path.resolve(__dirname, '../dist/css/*.css'),
    from : /url\(\/(fonts|images|sounds)\//g,
    to   : 'url(../$1/'
});

replace.sync({
    files: path.resolve(__dirname, '../dist/js/*.js'),
    from : [/(\.exports\s*=\s*\\")\/(fonts|images|sounds)\//g, /(\.exports\s*=\s*")\/(fonts|images|sounds)\//g],
    to   : '$1./$2/'
});

replace.sync({
    files: path.resolve(__dirname, '../dist/*.html'),
    from : /src="\/(fonts|images|sounds)\//g,
    to   : 'src="./$1/'
});
