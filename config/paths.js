const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    app: resolveApp('.'),
    build: resolveApp('dist'),
    devtools: resolveApp('src/devtools'),
    env: resolveApp('config/env'),
    indexJs: resolveApp('src/index.js'),
    layouts: resolveApp('src/layouts'),
    packageJson: resolveApp('package.json'),
    pages: resolveApp('src/pages'),
    static: resolveApp('static'),
    src: resolveApp('src'),
    styles: resolveApp('src/styles'),
    utils: resolveApp('src/utils'),
    // assets
    assets: resolveApp('src/assets'),
    images: resolveApp('src/assets/images'),
    fonts: resolveApp('src/assets/fonts'),
};
