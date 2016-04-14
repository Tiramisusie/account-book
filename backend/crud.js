'use strict';

var mongoose = require('mongoose'),
  db,
  Schema = mongoose.Schema,
  recordSchema = new Schema({
    date: Date,
    income: Array,
    expend: Array
  }),
  RecordModel = mongoose.model('record', recordSchema);

mongoose.connect('mongodb://localhost:27011/db/account');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect success');
});

var crud = {
  /**
   * 添加一条记录
   * @param date 日期
   * @param type 记录的类型:income/expend
   * @param data 记录的数据
   */
  addRecord(date, type, data){
    let callback = (err, record)=>{
      if (err) throw err;

      if (!record) {   //没有该日期的相关记录
        let doc = new RecordModel({
          date: date,
          income: [],
          expend: []
        });

        doc.set(type, [data])
          .save((err)=> {
            if (err) throw err;
          })

      } else {
        record.set(type, record[type].concat(data))
          .save((err)=>{
            if(err) throw err;
          });

      }
    };

    this.getOneDayRecord({date: date}, callback);
  },

  /**
   * 保存修改过的记录
   * @param date
   * @param type
   * @param data
   */
  saveRecord(date, type, data){
    let saveHandler = (err, record)=>{
      if(err) throw err;

      record.set(type, data)
        .save((err)=>{
          if(err) throw err;
        });

      this.getOneDayRecord({date: date}, saveHandler);
    }
  },

  getOneDayRecord(rules, callback){
    RecordModel.findOne(rules)
      .exec(callback)
  },

  /**
   * 获取某一时间段内的所有记录
   * @param start
   * @param end
   * @param callback
   */
  getRangeRecords(start, end, callback){
    RecordModel.find({ $and: [{$gte: start}, {$lte: end}] })
      .exec(callback);
  }
};

module.exports = crud;