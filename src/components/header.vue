//通用头部
<template>
  <div id="header">
    <x-header slot="header" 
      :title="this.title"
      :left-options="{showBack:this.back}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      >
      <router-link slot="left" to="/profile" v-show="this.icon"><x-icon type="navicon" size="32"></x-icon></router-link>
      <span slot="right" v-on:click="showMenus = true" v-show="this.more"><x-icon type="ios-gear-outline" size="32"></x-icon></span>
    </x-header>

    <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="navTo"></actionsheet>
 </div>
</template>



<script>
import { XHeader , Actionsheet} from 'vux'
import { mapState } from 'vuex'
export default {
  name:"headerView",
  components: {
    XHeader,
    Actionsheet
  },
  methods: {
    navTo: function(name) {
      this.$router.push(name)
    }
  },
  data () {
    return {
      menus:{
        help:'？帮&emsp;助', 
        about:'@ 关&emsp;于', 
        //donate:'&yen; 打&emsp;赏',
        //share:'&#8645; 分&emsp;享', 
        //devs:'&copy; 开发者',
      },
      showMenus: false
    }
  },
  computed: mapState({
    title:state => state.view.title,
    back:state  => false,
    icon:state  => state.view.xheader_icon,
    more:state  => state.view.xheader_more,
  })
}
</script>
<style scoped>
.vux-x-icon {
    fill:#fff;position:relative;top:-8px;left:-3px;
}
#header{padding-bottom:45px;}
</style>