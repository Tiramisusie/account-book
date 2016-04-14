/**
 * Created by liangningcong on 16/4/10.
 */
'use strict';

var crud = require('./crud');

var router = function(app) {
  //调用 crud 中的方法时注意把日期转换成 Date 类型!!!

  app.post('/addOneRecord', (req, res)=>{
    console.log(req.body);

    let date = req.body.date,
      type = req.body.type,
      data = req.body.data;
    
    crud.addRecord(date, type, data);
    res.end();
  });

  app.get('/getOneRecord', (req, res)=>{
    console.log(req.query);

    let time = req.query.date;

    crud.getOneDayRecord({date: new Date(time)}, (err, docs)=>{
      if(err) throw err;

      console.log(docs);
      res.send({
        records: docs
      });
    })
  })
};

module.exports = router;