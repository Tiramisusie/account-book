/**
 * Created by liangningcong on 16/4/14.
 */
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  router = require('./backend/router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

var server = app.listen(3031, function () {
  var host = server.address().address,
    port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

router(app);


