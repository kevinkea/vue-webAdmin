<template>
	<div>
		<div class="form-source box-card auth-menu" v-loading="listLoading">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>角色类型</span>
				</div>
				<div>
					<ul>
						<li v-for="(item,key) in  list" :key="key" :label="item" class="list-group-item"  @click="handleMenu(key)" :class="{active:key===choose}" >
							<span>{{item}}</span>
						</li>
					</ul>
				</div>
				<!--<div v-for="(item,key) in  list" :key="key" :label="item" class="list-group-item"  @click="handleMenu">-->
					<!--<span>{{item}}</span>-->
				<!--</div>-->
			</el-card>
		</div>
		<div class="menu-form-source menu-box-card auth-menu" >
			<el-card class="menu-box-card">
				<div slot="header" class="clearfix">
					<span>功能菜单</span>
				</div>
				<el-tree :data="menulist" show-checkbox default-expand node-key="id" ref="tree" highlight-current :props="defaultProps">
				</el-tree>
			</el-card>
		</div>
		<div class="menu-form-source menu-box-menu auth-menu">
			<el-button type="primary" @click="getCheckedKeys">授权</el-button>
		</div>
	</div>
</template>

<script>
	import { fetchRole, fetchMenuByRole } from '@/api/sys'

	export default {
	  name: 'auth-manage',
	  data() {
	    return {
	      choose: false,
	      menulist: null,
	      defaultProps: {
	        children: 'nodes',
          	label: 'text'
	      },
	      list: null,
	      listLoading: true,
		  nodes: null
	    }
	  },
	  	created() {
	    	this.getList()
		    //
	  	},
	  methods: {
	    getList() {
	      this.listLoading = true
	      fetchRole().then(response => {
	        this.list = response.data
	        this.listLoading = false
	      })
	    },
	    handleMenu: function(key) {
		  this.choose = key
	      this.getMenuList()
	    },
	    getMenuList() {
	      var selected = new Array()
	      fetchMenuByRole().then(response => {
	        this.menulist = response.data
		      this.menulist.forEach(function(res) {
		      	if (res.parent_id === '0') {
			        if (res.checked === 'true') {
				        selected.push(res.id)
			        } else {
			        	res.nodes.forEach(function(val) {
			                if (val.checked === 'true') {
			                  selected.push(val.id)
			                } else {
			                	val.nodes.forEach(function(arr) {
			                		if (arr.checked == 'true') {
			                			selected.push(arr.id)
					                }
				                })
			                }
				        })
			        }
		        }
		      })
		      console.log(selected)
		      this.$refs.tree.setCheckedKeys(selected)
	        // this.listLoading = false
	      })
	    },
	    getCheckedKeys() {
		    this.nodes = this.$refs.tree.getCheckedKeys()
		    var menuids = ''
		    for (var i = 0; i < this.nodes.length; i++) {
			    menuids += this.nodes[i] + ';'
		    }
		    menuids = menuids.substring(0, menuids.length - 1)
		    console.log(menuids)
		    console.log(this.$refs.tree.getCheckedKeys())
	    }

	  }
	}
</script>

<style scoped>
	ul{
		display: block;
		list-style-type: disc;
		-webkit-margin-before: 1em;
		-webkit-margin-after: 1em;
		-webkit-margin-start: 0px;
		-webkit-margin-end: 0px;
		-webkit-padding-start: 0px;
	}
.form-source{
	padding: 24px;
}
.box-card {
    /*width: 200px;*/
}
.list-group-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.list-group-item {
	cursor: pointer;
    background-color: inherit;
    border: 1px solid #e7eaec;
    display: block;
    margin-bottom: -1px;
    padding: 10px 15px;
    position: relative;
}

.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {
	cursor: pointer;
    background-color: #409EFF;
    border-color: #409EFF;
    color: #FFFFFF;
    z-index: 2;
}

.menu-form-source{
	padding: 24px 24px 24px 60px;
}
.menu-box-card {
    width: 300px;
}

.menu-box-menu {
	width: 80px;
	padding-left:80px;
}
.auth-menu{float:left}
</style>
