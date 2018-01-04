//通用方法
let conf = require("../config")
let axios = require('axios')
module.exports = {
    send(api,params,method="get"){
    	let data= {}
    	if(method=='post'){
    		data = params
    		params = {}
    	}
        let config = {
            method: method, 
            url: api, 
            data:data,
            params:params,
            headers:{"x-access-token":localStorage.getItem(conf.LS_TOKEN),'x-access-uid':localStorage.getItem(conf.LS_UID)}
        }
        return axios(config)
    },

    doAll(ms,cb){
        axios.all(ms)
        .then(axios.spread(cb));
    }
}