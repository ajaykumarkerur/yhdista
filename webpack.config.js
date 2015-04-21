module.exports = {
    entry: "./client.js",
    output: {
    path: __dirname,
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.jsx?$/, loader: "envify-loader"}
        ]
    }
};
