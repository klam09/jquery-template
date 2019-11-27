module.exports = function (api) {
    api.cache(true);

    const presets = [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    // "debug": true
                }
            ]
        ],
        babelrcRoots = [
            '.',
            'node_module/swiper',
            // 'node_module/dom7',
            // 'node_module/ssr-window',
        ];

    return {
        presets,
        babelrcRoots
    };
};
