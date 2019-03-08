module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /app/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                targets: {
                  browsers: ['defaults']
                }
              }]
            ]
          }
        }
      }
    ]
  }
}