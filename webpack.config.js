const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './build/'),
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "bundle.js",
        publicPath: path.resolve(__dirname, "./assets/")
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "./")
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }
}