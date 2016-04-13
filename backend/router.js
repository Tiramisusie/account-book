/**
 * Created by liangningcong on 16/4/10.
 */
var crud = require('./crud');

var router = function(app) {
  //调用 crud 中的方法时注意把日期转换成 Date 类型!!!

  app.post('/addOneRecord', (req, res)=>{
    console.log(req.body);
  })
};

module.exports = router;