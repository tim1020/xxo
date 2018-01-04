//通用页脚
<template>
  <div v-show="this.tabbar">
    <tabbar slot="bottom">
      <tabbar-item link="/index" :selected="this.selectedItem==1">
        <x-icon slot="icon" type="ios-grid-view"></x-icon>
        <x-icon slot="icon-active" type="ios-grid-view" class="x-icon-active"></x-icon>
        <span slot="label">游戏</span>
      </tabbar-item>
      <tabbar-item link="/game_list" :selected="this.selectedItem==2">
        <x-icon slot="icon" type="ios-monitor"></x-icon>
        <x-icon slot="icon-active" type="ios-monitor" class="x-icon-active"></x-icon>
        <span slot="label">围观</span>
      </tabbar-item>
      <tabbar-item link="/rank" :selected="this.selectedItem==3">
        <x-icon slot="icon" type="ios-people-outline"></x-icon>
        <x-icon slot="icon-active" type="ios-people-outline" class="x-icon-active"></x-icon>
        <span slot="label">榜单</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  import {mapState} from 'vuex'
  export default {
    name:"footerView",
    components: {Tabbar,TabbarItem},
    computed: mapState({
      tabbar:state        => state.view.tabbar,
      selectedItem:state  => state.view.selectedTabbarItem,
    })
}
</script>

<style scoped>
.vux-x-icon {
  fill: #cccccc;
}
.x-icon-active {
  fill: #1A6BE6;
}
</style>