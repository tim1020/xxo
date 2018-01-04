//mongodb
const util     = require('util')
const mongodb  = require('mongodb')
const ObjectId = mongodb.ObjectID;
const dbClient = mongodb.MongoClient
var dao = null;
//const dbColl
class MyMongo {
    async connect(dbConf){
        let url=''
        try{
        	if(!dbConf.database) throw 'ER_DATABASE_NOT_SET'
            if(dbConf.url != undefined){
                url = dbConf.url
            }else{
                if(!dbConf.host) throw 'ER_DB_HOST_NOT_SET'
                let port = dbConf.port || 27017
                url  = util.format('mongodb://%s:%d/%s',dbConf.host,port,dbConf.database)
            }
            let conn = await  dbClient.connect(url)
            this.db= conn.db(dbConf.database)
        }catch(err){
            throw err.message
        }
        return this
    }

    setCol(col) {
    	this.col = this.db.collection(col)
    }

    //add data,return _id
    async insert(data){
        let result = false
        try{
            result = await this.col.insert(data)
        }catch(err){
            throw err.message
        }
        if(result !== false) {
            if(result.insertedCount==1) result = result.insertedIds[0]
            else result = result.insertedIds
        }
        return result
    }

    async update(where,data){
        let result = false
        try{
            result = await this.col.update(where,{$set:data})
        }catch(err){
            throw err.message
        }
        if(result !== false) {
            result = result.result.ok > 0
        }
        return result
    }

    async getOne(where,options={}){
    	let result = false
    	if(where._id) where._id = ObjectId(where._id)
        try{
            result = await this.col.findOne(where,options)
        } catch(err){
            throw err.essage
        } 
        return result
    }
    async get(where,options={}){
    	let result = false
    	if(where._id) where._id = ObjectId(where._id)
        try{
            result = await this.col.find(where,options).toArray()
        }   
        catch(err){
            throw err.message
        }   
        return result
    }
}


module.exports ={ 
	connect :  (conf) =>{
		return async (ctx,next) => {
			if(dao != null) ctx.dao = dao
			else{
				let db = new MyMongo()
				dao = await db.connect(conf)

				ctx.dao = dao
			}
		  	await next();
		}
	}
}