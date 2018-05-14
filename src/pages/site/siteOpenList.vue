<template>
	<div class="list">
		<div @click="checkAll">.</div>
		<div class="checkList" v-for="item in List">
			<div>
				<span class="check" :class="{'isChecked':Listids.indexOf(item.id)>=0}"  @click="checkOne(item.id)"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'site-open-list',
	  data: function() {
	    return {
	      List: [
	        { id: 1, value: 'one' },
	        { id: 2, value: 'two' },
	        { id: 3, value: 'three' }
	      ],
	      Listids: [],
	      isCheckAll: false
	    }
	  },
	  methods: {
	    checkOne(id) {
	      var ids = this.Listids.indexOf(id)
	      if (ids >= 0) {
	        // 如果包含了该ID，则删除（单选按钮由选中变为非选中状态）
	        this.Listids.splice(ids, 1)
	      } else {
	        // 选中该按钮
	        this.Listids.push(id)
	      }
	      console.log(this.Listids)
	    },
	    checkAll() {
	      // 全选
	      const that = this
	      that.isCheckAll = !that.isCheckAll
	      if (that.isCheckAll) {
	        that.Listids = []
	        that.List.forEach(function(elm) {
	          that.Listids.push(elm.id)
	        })
	      } else {
	        that.Listids = []
	      }
	      console.log(this.Listids)
	    }
	  }
	}
</script>

<style scoped>

</style>
