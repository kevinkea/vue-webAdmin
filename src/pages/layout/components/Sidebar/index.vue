<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

import { fetchMenu } from '@/api/sys'

export default {
  data () {
    return {
      // routes: []
    }
  },
  components: { SidebarItem, ScrollBar },
  // created() {     //created通过网络接口调用菜单
  //   fetchMenu().then(response => {
  // 	  this.routes = response.data
  //   })
  //   return this.routes
  // },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
    	console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {

  }
}
</script>
