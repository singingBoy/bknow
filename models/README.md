# Schema  ：一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
    //NodeJS中的基本数据类型都属于Schema.Type，另外Mongoose还定义了自己的类型
    var ExampleSchema = new Schema({
      name:String,
      binary:Buffer,
      living:Boolean,
      updated:Date,
      age:Number,
      mixed:Schema.Types.Mixed, //该混合类型等同于nested
      _id:Schema.Types.ObjectId,  //主键
      _fk:Schema.Types.ObjectId,  //外键
      array:[],
      arrOfString:[String],
      arrOfNumber:[Number],
      arrOfDate:[Date],
      arrOfBuffer:[Buffer],
      arrOfBoolean:[Boolean],
      arrOfMixed:[Schema.Types.Mixed],
      arrOfObjectId:[Schema.Types.ObjectId]
      nested:{
        stuff:String,
      }
    });