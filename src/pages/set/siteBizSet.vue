<template>
	<div class="form-source">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="场馆名称" prop="site_name">
				<el-col span="8">
				<el-input v-model="ruleForm.site_name"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="所属门店" prop="corp_id">
				<el-select v-model="ruleForm.corp_id" placeholder="请选择门店">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="场馆类型" prop="site_type">
				<el-select v-model="ruleForm.site_type" placeholder="请选择场馆类型">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="营业时间" required>
				<el-col :span="11">
					<el-form-item prop="startTime">
						<el-time-select
								placeholder="起始时间"
								v-model="ruleForm.startTime"
								:picker-options="{
							      start: '08:30',
							      step: '00:60',
							      end: '18:30'
							    }">
						</el-time-select>
					</el-form-item>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-form-item prop="endTime">
						<el-time-select
								placeholder="结束时间"
								v-model="ruleForm.endTime"
								:picker-options="{
							      start: '08:30',
							      step: '00:60',
							      end: '18:30',
							      minTime: ruleForm.startTime
							    }">
						</el-time-select>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="折扣" prop="discount">
				<el-col :span="3">
					<el-input v-model="ruleForm.discount"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="场馆描述" prop="description">
				<el-col span="8">
				<el-input type="textarea" v-model="ruleForm.description"></el-input>
				</el-col>
			</el-form-item>
			<div class="form-block"></div>
			<!-- <div class="line"></div> -->
			<el-form-item label="常规时段" prop="basicprice">
				<el-col :span="3">
					<el-input v-model="ruleForm.basicprice"></el-input>
				</el-col>
				元/小时
			</el-form-item>
			<el-form-item label="其他时段:"></el-form-item>
			<div class="button-margin"><el-button type="primary" @click="addTable">添加</el-button></div>
			<div class="form-source">
			<el-table border :data="tableData" style="width: 100%">
				<el-table-column prop="fromtime" label="开始时间" width="100">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.fromtime"></el-input>
						</template>
						<span v-else>{{ scope.row.fromtime }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totime" label="结束时间" width="100">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.totime"></el-input>
						</template>
						<span v-else>{{ scope.row.totime }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="monday" label="周一">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.monday"></el-input>
						</template>
						<span v-else>{{ scope.row.monday }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="tuesday" label="周二">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.tuesday"></el-input>
						</template>
						<span v-else>{{ scope.row.tuesday }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="wednesday" label="周三">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.wednesday"></el-input>
						</template>
						<span v-else>{{ scope.row.wednesday }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="thursday" label="周四">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.thursday"></el-input>
						</template>
						<span v-else>{{ scope.row.thursday }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="friday" label="周五">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.friday"></el-input>
						</template>
						<span v-else>{{ scope.row.friday }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="saturday" label="周六">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.saturday"></el-input>
						</template>
						<span v-else>{{ scope.row.saturday }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="sunday" label="周日">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-input class="edit-input" size="small" v-model="scope.row.sunday"></el-input>
						</template>
						<span v-else>{{ scope.row.sunday }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<template v-if="scope.row.edit">
							<el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
							<el-button type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
						</template>
						<template v-else>
							<el-button type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
						</template>
						<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small"> 移除</el-button>
						<!--<el-button @click="confirm(scope.row)" type="success" size="small"> 确定</el-button>-->
					</template>
				</el-table-column>
			</el-table>
			</div>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	    	price: null,
	    	tableData: null,
		    list: [],
	      ruleForm: {
	        site_name: '',
	        corp_id: '',
        startTime: '08:30',
		    endTime: '18:30',
	        site_type: '',
	        discount: '1',
	        description: '',
		    basicprice: '20'
	      },
	      rules: {
	        site_name: [
	          { required: true, message: '请输入场馆名称', trigger: 'blur' },
	          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
	        ],
	        corp_id: [
	          { required: true, message: '请选择门店', trigger: 'change' }
	        ],
	        site_type: [
	          { required: true, message: '请选择场馆类型', trigger: 'change' }
	        ],
	        startTime: [
	          { required: true, message: '请选择开始时间', trigger: 'change' }
	        ],
	        endTime: [
	          { required: true, message: '请选择结束时间', trigger: 'change' }
	        ],
	        discount: [
	          { required: true, message: '请填写折扣', trigger: 'blur' }
	        ],
		    basicprice: [
			  { required: true, message: '请填写常规时段价格', trigger: 'blur' }
		    ],
	        description: [
	          { required: true, message: '请填写场馆描述', trigger: 'blur' }
	        ]
	      }
	    }
  },
	  watch: {
	  },
	  computed: {

	  },
	  methods: {
	  	addTable() {
	  		this.price = this.ruleForm.basicprice * this.ruleForm.discount
		    this.list.push({
			    fromtime: this.ruleForm.startTime,
			    totime: this.ruleForm.endTime,
			    monday: this.price,
			    tuesday: this.price,
			    wednesday: this.price,
			    thursday: this.price,
			    friday: this.price,
			    saturday: this.price,
			    sunday: this.price
		    })
		    this.tableData = this.list.map(v => {
		    	console.log(111)
			    this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
			    v.originalSunday = v.sunday //  will be used when user click the cancel botton
			    return v
		    })
	    },
		  cancelEdit(row) {
			  row.sunday = row.originalSunday
			  row.edit = false
			  this.$message({
				  message: '值未修改',
				  type: 'warning'
			  })
		  },
		  confirmEdit(row) {
			  row.edit = false
			  row.originalSunday = row.sunday
			  this.$message({
				  message: '值已修改',
				  type: 'success'
			  })
		  },
		  confirm(row) {
			  console.log(row)
		  },
	    deleteRow(index, rows) {
		  rows.splice(index, 1)
		  this.list.splice(index, 1)
	    },
	    submitForm(formName) {
	      this.$refs[formName].validate((valid) => {
	        if (valid) {
	          alert('submit!')
	        } else {
	          console.log('error submit!!')
	          return false
	        }
	      })
	    },
	    resetForm(formName) {
	      this.$refs[formName].resetFields()
	    }
	  }
	}
</script>
<style scoped>
	.form-source{
		width:1000px;
		padding: 24px;
	}
	.form-block{
		height: 24px;
		border-top: 1px solid #ebebeb;
		border-radius: 3px;
		transition: .2s;
	}
	.button-margin{
		padding-left: 24px;
	}
</style>
