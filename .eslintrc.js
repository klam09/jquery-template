module.exports = {
    extends: 'airbnb-base',
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    globals: {
        APPCONFIG: 'readonly',
    },
    rules: {
        'comma-dangle': [
            'error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            }],
        indent: [2, 4],
        'max-len': [
            'error', 120, 2, {
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'no-console': 0, // console to be removed by terser-webpack-plugin
        'no-underscore-dangle': 0,
        // import
        'import/no-unresolved': 0, // ignore webpack alias
        // promise
        'promise/param-names': 'error',
        'promise/always-return': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-native': 'off',
    },
    plugins: ['import', 'promise'],
};
