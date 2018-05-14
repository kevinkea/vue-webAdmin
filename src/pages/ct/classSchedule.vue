<template>
	<div class="form-source">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>课程表</span>
			</div>
			<table class="table--border">
				<thead>
					<tr>
						<th>小时／星期</th>
						<th v-for="w in weekList" :key="w">{{w}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for = "time in numbers" :key = "time" id="weektime">
						<td>{{time}}</td>
						<td v-for = "(day,index) in weekList" @click = "orderClass(day, time)" :key="index" :id="index+'_'+time" ref="index">

						</td>
					</tr>
				</tbody>
			</table>
		</el-card>
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
				<el-form-item :label="'星期'" prop="name">
					<el-col :span="8">
						<el-select class="filter-item" v-model="temp.week" placeholder="请选择">
							<el-option v-for="item in  weekList" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item :label="'课程'">
					<el-select class="filter-item" v-model="temp.lesson_id" placeholder="请选择">
						<el-option v-for="item in  lessonData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="'教练'">
					<el-col :span="8">
					<el-input v-model="temp.trainer"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item :label="'开始时间'">
					<el-col :span="8">
					<el-input v-model="temp.start_time"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item :label="'结束时间'">
					<el-col :span="8">
					<el-input v-model="temp.end_time"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item :label="'备注'">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="" v-model="temp.remark">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{'取消'}}</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{'添加'}}</el-button>
				<el-button v-else type="primary" @click="deleteData">{{'删除'}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { fetchSchedule, fetchLesson } from '@/api/ct'

	export default {
	  name: 'class-schedule',
	  data() {
	  	return {
		  weekList: { 'Monday': '星期一', 'Tuesday': '星期二', 'Wednesday': '星期三', 'Thursday': '星期四', 'Friday': '星期五', 'Saturday': '星期六', 'Sunday': '星期日' },
		  numbers: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
		  listarr: [],
		  lessonData: [],
		  list: [],
		  num: null,
		  dataid: '',
	      temp: {
		    week: '',
		    lesson_id: '',
		    trainer: '',
		    start_time: '',
		    end_time: '',
		    remark: ''
	      },
	      dialogFormVisible: false,
	      dialogStatus: '',
	      textMap: {
		    delete: '删除',
		    create: '创建'
	      },
	      rules: {
		    week: [{ required: true, message: '星期不能为空', trigger: 'change' }],
		    lesson_id: [{ required: true, message: '课程不能为空', trigger: 'change' }],
		    trainer: [{ required: true, message: '教练不能为空', trigger: 'blur' }]
	      }
	    }
	  },
	  mounted() {
		  this.initData()
		  this.handleData()
	  },
	  methods: {
	    initData() {
		    fetchLesson().then(response => {
			    this.lessonData = response.data
		    }).catch(function(response) {
			    console.log(response)
		    })
	    },
	    handleData() {
		  fetchSchedule().then(response => {
        this.list = response.data
		  // console.log(this.list[0])
			  for (var i = 0; i < this.list.length; i++) {
	          var line = this.list[i].week_day
			  var time = this.list[i].start_time
			  var trainer = this.list[i].trainer
			  var lesson = this.list[i].chs_lesson_id
			  // this.$el.querySelector(line+'_'+time) = trainer+" "+lesson
	          var weektime = document.getElementById(line + '_' + time).innerText = trainer + ' ' + lesson
			  // weektime = trainer + ' ' + lesson

			  }
		  }).catch(function(response) {
		    console.log(response)
		  })
		 },
	    orderClass(day, time) {
		    // this.resetTemp()
		    this.dialogStatus = 'create'
		    this.dialogFormVisible = true
		    this.$nextTick(() => {
			    this.$refs['dataForm'].clearValidate()
		    })
		    this.temp.week = day
		    this.temp.start_time = time
		    var arr = time.split(':')
		    this.temp.end_time = Number(arr[0]) + 1 + ':00'
	    },
	    createData() {

	    },
	    deleteData() {

	    }

	  }
	}
</script>

<style scoped>
	.form-source{
		padding: 24px;
	}
	.table--border {
		border: 1px solid #ebeef5;
	}
	.table--border th, .table--border td{
		border-right: 1px solid #ebeef5;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		background-color: #fff;
		font-size: 14px;
		margin-bottom: 45px;
		line-height: 1.5em;
	}
	table td, table th {
		border-bottom: 1px solid #d8d8d8;
		padding: 15px;
		max-width: 250px;
	}
	table th, table td {
		text-align: left;
		white-space: nowrap;
		color: #666;
		font-weight: 400;
	}
	/*table th, table td {*/
		/*border-bottom: 1px solid #d8d8d8;*/
		/*padding: 15px;*/
		/*max-width: 250px;*/
	/*}*/
</style>
