<template>
	<div class="form-source">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>预约信息</span>
			</div>
			<div>
				客户：
				<el-button type="primary" @click="getUserInfo">客户资料</el-button>
			</div>
		</el-card>
		<el-dialog title="客户信息" :visible.sync="dialogTableVisible">
			<el-table :data="gridData">
				<el-table-column property="date" label="日期" width="150"></el-table-column>
				<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogTableVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
	  name: 'lesson-order',
	  data() {
	  	return {
	  		gridData: null,
		  dialogTableVisible: false
	    }
	  },
	  methods: {
		  getUserInfo() {
			  this.dialogTableVisible = true
		  }
	  }
	}
</script>

<style scoped>
	.form-source{
		padding: 24px;
	}
</style>
