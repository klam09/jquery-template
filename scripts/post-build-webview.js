const shell = require('shelljs');

const argv = process.argv;

if (argv.length < 3) {
    console.log('Please specify ios / aos');
    return -1;
}

switch (argv[2]) {
    case 'aos':
        shell.rm('-rf', './tools/aosWebView/app/src/main/assets/www');
        shell.cp('-R', './dist/', './tools/aosWebView/app/src/main/assets/www');
        break;
    case 'ios':
        shell.rm('-rf', './tools/iosWebView/assets/www');
        shell.cp('-R', './dist/', './tools/iosWebView/assets/www');
        break;
}
