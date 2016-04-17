/**
 * Created by liangningcong on 16/4/10.
 */
'use strict';

var crud = require('./crud');

var router = function(app) {
  //调用 crud 中的方法时注意把日期转换成 Date 类型!!!

  app.post('/addOneRecord', (req, res)=>{
    let date = req.body.date,
      type = req.body.type,
      data = req.body.data;
    
    let result = {
      err: 0,
      msg: ''
    };

    let callback = (err)=>{
      if(err) {
        result.err = 1;
        result.msg = err;
      }
      res.send(result);
    };
    
    crud.addRecord(date, type, data, callback);
  });

  app.get('/getOneRecord', (req, res)=>{
    let time = req.query.date;

    crud.getOneDayRecord({date: new Date(time)}, (err, docs)=>{
      if(err) throw err;

      res.send(docs);
    })
  });
  
  app.post('/deleteOne', (req, res)=>{
    let id = req.body.id,
      data = req.body.data;
    let result = {
      err: 0,
      msg: ''
    };
    let callback = (err)=>{
      if(err){
        result.err = 1;
        result.msg = err;
      } 
      res.send(result);
    };
    
    crud.deleteOneRecord(id, data, callback);
  })
};

module.exports = router;