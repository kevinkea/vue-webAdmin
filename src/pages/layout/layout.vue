<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<AppHeader></AppHeader>
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { AppHeader, Navbar, Sidebar, AppMain } from '@/pages/layout/components'

export default {
  name: 'layout',
  components: {
    AppHeader,
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
