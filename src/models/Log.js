"use strict";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

/**
 * @type {mongoose.Schema}

  {
    "level" : "ERROR",                          // 日志级别
    "loggerName" : "api_log",                   // 从哪里来的
    "message" : "dfsdfasdf",                    // 消息
    "marker" : {"name": "ios"},                 // ios android pc backend spark
    "millis" : NumberLong(1470812342589),       //事件发生时间
    "date" : ISODate("2016-08-10T06:59:02.589Z"), //api接收的时间
    "thrown" : null,//错误堆栈
    "contextMap" : {                              //日志发生时的MDC，自定义字段，可扩展
            "data":"报错的数据,数据体内的特殊字符全部转码处\"理 or base64编码",                                            //必须字段
            "httpHeader":"当时请求时候的header"    //必须字段
    },
    "contextStack" : []                          //日志发生时的NDC，自定义字段，可扩展
  }

 */

let logSchema = new Schema({
  "serverTime": {type: Date, default: Date.now} //Server required, Time recorded by server
}, {"strict": false, "validateBeforeSave": false});

mongoose.model('Log', logSchema);