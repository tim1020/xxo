xxo，一种有趣的棋类小游戏
=======================

## 演示地址

http://xxo.vrdevs.com/

注：该主机主力ss，比较卡。

## 代码说明

代码包含前端和后端， 前端（src目录）基于Vue(vuex、vue-router、vux)实现,后端(backend目录)基于koa2+ec-router。

## 安装使用

1. 后端
	
	a. 安装mongodb,并修改后端配置中的连接参数(backend/config.js)

	b. 进入backend目录, 执行```npm install && npm update```安装依赖

	c. 执行```npm start```运行

2. 前端
  
  在xxo项目目录，执行npm install安装依赖，修改配置指定后端。
  
	执行```npm run dev```
  
  或执行```npm run build```打包，并将build/dist/下的文件部署到webserver

