const path = require('path');

module.exports = (env, options) => {
    const mode = options.mode || 'development';

    const name = 'html2pdf';
    const fileName = name + (mode === 'production' ? '.min' : '') + '.js';

    return {
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: fileName,
            library: name,
            libraryTarget: 'umd',
            libraryExport: 'default',
            umdNamedDefine: true
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
            rules: [
                {
                    test: [/.js$|.ts$/],
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                }
            ]
        }
    };
};
