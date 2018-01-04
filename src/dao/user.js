let dao = require('./')
let conf = require("../config");
module.exports = {
    profile(uid){ 
        return dao.send(conf.API.profile,{uid:uid})
    },
    reg(nick){
        return dao.send(conf.API.reg,{nick:nick},'post')
    },
    rank(order){
    	return dao.send(conf.API.rank,{order:order})
    }
}