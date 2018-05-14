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
			</el-form>
			<div class="form-block"></div>
			<div class="date-list">
				<ul class="dates">
					<li class="left"></li>
					<li class="right"></li>
					<li id="datesContainer">
						<ul class="dateinfo">
							<li v-for = "(day,key) in weekList" :key = "key"  @click="loadTime(day, key)" :class="{selected:key===choose}">
								<div>{{day.week}}</div>
								<div class="day">{{day.date}}</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div id="divSchedule" class="">
				<!-- 时间 -->
				<div class="container-fluid timeblock">
					<div class="timeheader">
						<div class="timelistwrap" style="left: 0px;">

							<ul class="timelist">
								<li v-for = "(time, key) in timeList" :key = "key"  @click="loadTime(time, key)">
									<div class="timetext">{{time}}</div>
									<div class="short-vertical"></div>
									<div class="short-vertical-half"></div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- table -->
				<div class="infoandscrollerblock">
					<div class="scrollerblock">
						<div class="container-fluid">
							<div class="scheduletablewrap">
								<div class="schedulelist">
									<div class="tablewrap">
										<table>
											<thead>
											<tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
											</thead>
											<tbody>
											<tr>
												<td colspan="2"  v-for = "(time, key) in timezone" :key = "key"  @click="orderlocation(time, key)" class="scheduletd-l" :class="{'checked':selclass.indexOf(key)>=0}">
													<div></div>
												</td>
											</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="infoblock">
				<h6>订单信息</h6>
				<div class="empty">请选择时间或者订单</div>
				<div class="container">
					<div class="booked-info row show">
						<div class="">
							<div class="labeltitle">场地：</div>
							<div class="serialnumber" id="ordersite">{{ruleForm.mbrshipId}}场馆</div>
						</div>
						<div>
							<div class="labeltitle">时间：</div>
							<div class="serialnumber" id="ordertime">
								<div v-for = "(time, key) in timearr" :key = "key">{{time}}</div>
								<!--<div>05月05日 15:00 ~ 16:00</div>-->
								<!--<div>05月05日 17:00 ~ 18:00</div>-->
							</div>
						</div>
						<div>
							<div class="labeltitle">价格：</div>
							<div class="serialnumber" id="orderprice">{{ruleForm.consultant}} 元</div>
						</div>
						<br>
					</div>

					<div class="buttonblock row">
						<div class="submitwrap show">
							<el-button type="primary" @click="confirm">确认订场</el-button>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
import { formatDate, getWeek} from '@/utils/time'
import { fetchMbrshipPay, fetchMbrshipPayById, fetchPrice } from '@/api/pay'
import waves from '@/directive/waves' // 水波纹指令

export default {
	  name: 'site-open-status',
	  directives: {
	    waves
	  },
	  data () {
	    return {
	      choose: false,
		  check: '',
		  dateinfo: '',
	      timearr: [],
		  selclass: [],
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
		    this.weekList.push({ week: getWeek(dateTime), date: formatDate(dateTime, 'weekday') })
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
	    loadTime (item, key) {
	      this.choose = key
		  for (let i = 0; i < this.selclass.length; i++) {
	        this.selclass[i] = ''
		  }
	      this.loadScheduleData(item)
	    },
	    loadScheduleData (item) {
		  var start = 8
	      var end = 22
		  var arr = new Array()
	      for (var i = start; i <= end; i++) {
		      arr.push(i + ':00')
	      }
	      this.timeList = arr
	      console.log(this.timeList)
		  this.dateinfo = item.date
		    console.log(this.dateinfo)
		  var timearr = new Array()
	      for (var i = start; i < end; i++) {
		  	timearr.push(i + ':00')
	      }
		  this.timezone = timearr
	    },
	    orderlocation (item, key) {
	      var check = this.selclass.indexOf(key)
	      if (check >= 0) {
		    // 如果包含了该ID，则删除（单选按钮由选中变为非选中状态）
		    this.selclass.splice(check, 1)
	      } else {
		    // 选中该按钮
		    this.selclass.push(key)
	      }
	      var time = item
		  console.log(this.dateinfo)
	      this.timearr.push(this.dateinfo + ' ' + item)
	      console.log(this.selclass)
		   //  if (e.target.className.indexOf('selected') > -1) {
	      //     e.target.className = '' // 切换按钮样式
		   //  // 写逻辑
	      // } else {
	      //     e.target.className = 'selected'// 切换按钮样式
		   //  // 写逻辑
	      // }

		  // this.$set(this.select[key], 'select', true)
	    },
	    confirm () {

	    }
	  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/site.scss";

</style>
