var conf = require('../config')
module.exports = {
    //do before all controller action
    before : async (ctx) => {
      if(ctx.request.url != '/user/reg'){
      	let token = ctx.headers['x-access-token']
      	ctx.uid   = ctx.headers['x-access-uid']
        if(!ctx.uid || !token) throw 'miss access-control: uid、token'
        ctx.dao.setCol(conf.coll_user)
     		let r = await ctx.dao.getOne({_id:ctx.uid,token:token})
     		if(!r) {
     			ctx.status = 401
          return
     		}else{
          ctx.userInfo = r
        }
      } 
    },

    //do after all controller action
    after: async (ctx) => {
    },
}