let path = require('path');

module.exports = {
    mode: "none",
    entry: './src/main/resources/static/App.js',
    output: {
        path: path.join(__dirname, './src/main/resources/static'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loaders: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:/.css$/,
                use:['style-loader','css-loader']
            },
            {
                //test: /.(jpe?g|png|gif|svg)$/i,
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8000,
                        name: './img/[hash]-[name].[ext]'
                    }
                }
                    //'img-loader'
                    //'url-loader?limit=10000',
                ]
            }

        ]
    }
};