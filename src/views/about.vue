//关于
<template>
  <div>
        <h1>XXO<span>{{ ver }}</span></h1>
        <div id="auth">Tim &lt;tim8670@gmail.com&gt;</div>
  
        <div class="title"> &spades; 关于XXO</div>
        <div class="content">
            <p>作者小时候经常玩一种有趣的棋类小游戏，它规则简单，不受场地和器材限制，随手拿树枝在地上画个棋盘，再捡点小石块、树叶、纸片等做棋子就可以跟小伙伴展开厮杀了。</p>
            <p>由于无法考究这游戏的名字，又由于这游戏吃棋的方法是在同一直线上形成2对1的阵势，所以，我就随便起了个名字叫XXO &#9786;</p>
        </div>

        <div class="title">&hearts; 关于作者</div>
        <div class="content">
            <p>一名在互联网行业搬砖多年的老工程师，现在是更喜欢山野和户外的伪驴友。</p>
            <p>本项目前端基于vue(包括vuex、vue-router、vux)、axios、webpack等构建，后端基于koa2、 ec-router，代码托管在 https://github.com/tim1020/xxo: ，欢迎贡献代码和想法。</p>
        </div>


  </div>
</template>

<script>
import config from "../config"
export default {
    data () {
        return {
            ver:  config.VER,
        }
  }
}
</script>

<style scoped>
h1 {text-align:center;padding-top:15px;font-size:1.8rem;}
h1 span {font-size:0.8rem;color:#cfcfcf;}
div {margin:5px;padding:5px;font-size:1rem;}
#auth{
    text-align:center;color:#8f8f8f;
}
.title{
    font-weight:bold;
    font-size:1.3rem;
    color:#8f8f8f;
    padding:8px;
    border-bottom:1px dashed #ccc;
}
.content p{
    text-indent:2rem;
    line-height:2rem;
    padding-top:1rem;
}
</style>