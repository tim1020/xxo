const Koa = require('koa')

const dao 		    = require('./middleware/dao')

const bodyParser    = require('koa-bodyparser')
const ecRouter      = require('../../ec-router')

const conf =  require('./config')


process.env.NODE_ENV = conf.env
const app = new Koa()

app.use(
	async (ctx,next) =>{
		ctx.set('Access-Control-Allow-Headers','Origin, X-Access-Token,X-Access-Uid,Content-Type')
		ctx.set('Access-Control-Allow-Origin', '*')	
		await next();
	}
)
app.use(dao.connect(conf.dbConf))
app.use(bodyParser())

ecRouter.loadConfig(__dirname+'/config.js')
app.use(ecRouter.dispatcher())

app.listen(conf.port)
console.log('[demo] starting at port 3000')