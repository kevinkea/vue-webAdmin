<template>
	<div class="form-source">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>开场状态</span>
			</div>
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

				<el-form-item label="场馆业务" prop="mbrshipId">
					<el-col :span="8">
						<el-input v-model="ruleForm.mbrshipId"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="场馆" prop="consultant">
					<el-col :span="8">
						<el-input v-model="ruleForm.consultant"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="时间" prop="consultant">
					<el-date-picker v-model="value2" type="date" placeholder="选择日期">
					</el-date-picker>
					<el-time-select placeholder="起始时间"  v-model="startTime"
						:picker-options="{start: '08:00', step: '00:60', end: '22:00' }">
					</el-time-select>
					<el-time-select placeholder="结束时间" v-model="endTime"
						:picker-options="{ start: '08:00',  step: '00:60',  end: '22:00',  minTime: startTime}">
					</el-time-select>
				</el-form-item>
			</el-form>
			<div class="form-block"></div>

		</el-card>
	</div>
</template>

<script>
export default {
	  name: 'site-open-pay',
	  data () {
		    return {
      value1: '',
			  value2: '',
		        startTime: '',
	            endTime: '',
		      choose: false,
		      weekList: [],
		      timeList: [],
		      timezone: [],
		      ruleForm: {
		        mbrshipId: '',
		        consultant: ''
		      },
		      dialogTableVisible: false
		    }
	  },
	  created () {
		    this.initData()
	  },
	  methods: {
		    initData () {
		      var time = new Date().getTime()
		      for (var i = 0; i <= 18; i++) {
		        var dateTime = new Date(time + (i * 24 * 60 * 60 * 1000))
		        this.weekList.push({ week: this.getWeek(dateTime), date: this.formatDate(dateTime, 'weekday') })
		      }
		      console.log(this.weekList)
		    },
		    getUserInfo () {
		      fetchMbrshipPay().then(response => {
		        this.gridData = response.data
		        console.log(this.gridData)
		        this.total = response.recordsTotal
		      })
		    },
		    loadTime (key) {
		      this.choose = key
		      this.loadScheduleData()
		    },
		    loadScheduleData () {
		      var start = 8
		      var end = 22
		      var arr = new Array()
		      for (var i = start; i <= end; i++) {
		        arr.push(i + ':00')
		      }
		      this.timeList = arr
		      console.log(this.timeList)

		      var timearr = new Array()
		      for (var i = start; i < end; i++) {
		        timearr.push(i + ':00')
		      }
		      this.timezone = timearr
		    },
		    orderlocation (key) {

		    }
	  }
}
</script>

<style scoped>

</style>
