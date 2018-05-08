<template>
    <div class="headerWrapper">
    <header class="header" ref="header">
	    <div class="container">
		    <h1><router-link :to="'/'">
			    <!-- logo -->
			    <slot>
				    <img :src="element"  alt="element-logo" class="nav-logo">
			    </slot>
		    </router-link></h1>
		    <!-- nav -->
		    <ul class="nav">
			    <li class="nav-item">
				    <span>欢迎登录系统</span>
			    </li>
			    <li class="nav-item">
				    <el-dropdown>
					  <span class="el-dropdown-link">
					    {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					    <el-dropdown-menu slot="dropdown">
						    <router-link to="/">
						    <el-dropdown-item> 首页 </el-dropdown-item>
						    </router-link>
						    <el-dropdown-item divided>
						    <span @click="logout" style="display:block;">登出</span>
						    </el-dropdown-item>
					    </el-dropdown-menu>
				    </el-dropdown>
			    </li>
		    </ul>
	    </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import element from '@/assets/element.svg'

export default {
  name: 'appheader',
  computed: {
    ...mapGetters([
      'avatar',
	    'name'
	    ])
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
	    element
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>
<style scoped>
  .headerWrapper {
    height: 61px;
  }
  .header {
    height: 61px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    position: relative;
	  border-bottom: solid 1px #e6e6e6;
  }
  .header h1 {
	  margin: 0;
	  float: left;
	  font-size: 32px;
	  font-weight: 400;
  }
  .header .container {
	padding-right: 60px;
	padding-left: 60px;
    height: 100%;
    box-sizing: border-box;
  }
  .header .nav {
	  float: right;
	  height: 100%;
	  line-height: 60px;
	  background: transparent;
	  padding: 0;
	  margin: 0;
  }
  .header .nav-item {
	  margin: 0;
	  float: left;
	  list-style: none;
	  position: relative;
	  cursor: pointer;
  }
  .header .nav-item span {
	  height:30px;
	  text-decoration: none;
	  color: #888;
	  display: block;
	  padding: 0 22px;
  }
  .nav-logo{
	  padding-top: 10px;
  }

</style>
