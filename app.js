/**
 * Created by liangningcong on 16/4/14.
 */
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  router = require('./backend/router');
var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var compiler = webpack(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {colors: true}
}));

app.use(WebpackHotMiddleware(compiler));

var server = app.listen(3031, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

router(app);


