//配置项
module.exports = {
	VER: 		'1.0.1-2-dev',
	LS_TOKEN: 	'_token',
	LS_UID: 	'_uid',
	API_HOST:   'http://localhost:3000/',
	API_RESCODE:{
		OK:200,
		NOT_LOGINED:401,
	},
	API_TIMEOUT: 5000,
	API:{
		reg:           		'/user/reg',
	    profile:       		'/user/profile',      //用户信息
	    rank:          		'/user/rank',	     //排名
	    game_list:     		'/game/list',
	    game_query: 		'/game/query',
	    game_create:   		'/game/create',
	    game_mv:       		'/game/mv',
	} ,

}