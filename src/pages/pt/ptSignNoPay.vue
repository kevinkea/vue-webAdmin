<template>
	<transition name="DTpicker">
		<div id="DTpicker" class="DTpicker" v-show="isShow">
			<div class="DTpicker_t">
				<p>{{ monthList[month -1] }}&nbsp;&nbsp;{{ year }}</p>
				<span class="DTpicker_t_l" @click="changeMonth(-1)"> &lsaquo; </span>
				<span class="DTpicker_t_r"  @click="changeMonth(1)"> &rsaquo; </span>
			</div>
			<table class="DTpicker_m">
				<thead>
				<tr key="thead">
					<th v-for="w in weekList" :key="w">{{w}}</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(d,index) in da" :key="index">
					<td
							:class="{'gray': day.sign == 0 || day.sign == 2,'current' : day.day == currentDay && day.sign !== 0 && day.sign !== 2}"
							v-for="day in d"
							@click="changeDay(day)"
							:key="day.sign +'-' + day.day"
					>{{day.day}}</td>
				</tr>
				</tbody>
			</table>
		</div>
	</transition>
</template>
<script>
	export default {
	  data() {
	    return {
	      weekList: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	      // monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
	      month: 0,
	      year: 0,
	      week: '',
	      currentDay: 0,
	      listArr: [],
	      isShow: false,
	      timerId: null,
	      isFocus: false,
	      isMouseover: false
	    }
	  },
	  props: {
	    el: {
	      type: String,
	      default: ''
	    }
	  },
	  computed: {
	    da() { // 设置数据格式
	      var arr = []
	      if (this.listArr.length <= 0) return arr
	      for (var i = 0; i * 7 < this.listArr.length; i++) {
	        arr.push(this.listArr.slice(i * 7, (i + 1) * 7))
	      }
	      return arr
	    },

	    timeFormat() {
	      return this.year + '-' + this.month + '-' + this.currentDay
	    }
	  },
	  methods: {
	    getCountDays(timeFormat) {
	      var arr = timeFormat.split('-')
	      var date = new Date(arr[0], arr[1] + 1, 0)
	      return date.getDate() // 返回某月天数
	    },
	    getUpDay(date) {
	      var arr = date.split('-'), timeFormat
      if (arr[1] == 1) {
	        timeFormat = arr[0] - 1 + '-' + 12 + '-' + 1
	      } else {
	        timeFormat = arr[0] + '-' + (arr[1] - 1) + '-' + 1
	      }
	      return this.getCountDays(timeFormat) // 返回上个月的天数
	    },
	    getNextDay(date) {
	      var arr = date.split('-'), timeFormat

      if (arr[1] == 12) {
	        timeFormat = Number(arr[0]) + 1 + '-' + 1 + '-' + 1
	      } else {
	        timeFormat = arr[0] + '-' + (Number(arr[1]) + 1) + '-' + 1
	      }
	      return this.getCountDays(timeFormat) // 返回下个月的天数
	    },
	    dateArr(date) { // 设置listArr
	      var listArr = []
	      var startDay = this.getUpDay(date)
	      var endDay = this.getNextDay(date)
	      var cDate = this.getCountDays(date)
	      var startWeek = new Date(this.year + '-' + this.month + '-' + 1).getDay()
	      var endWeek = new Date(this.year + '-' + this.month + '-' + cDate).getDay()
	      for (var i = 1; i <= cDate; i++) {
	        listArr.push({
	          day: i,
	          sign: 1
	        })
	      }
	      if (startWeek != 0) {
	        for (var i = startDay; i > startDay - startWeek; i--) {
	          listArr.unshift({
	            day: i,
	            sign: 0

	          })
	        }
      }
	      if (endWeek != 6) {
	        for (var i = 1; i <= 6 - endWeek; i++) {
	          listArr.push({
	            day: i,
	            sign: 2
	          })
	        }
      }
	      if (i > 5) {
	        i = 0
      }
	      if (listArr.length <= 35) {
	        for (var j = 0; j < 7; j++) {
	          listArr.push({
	            day: i + j,
	            sign: 2
	          })
	        }
	      }
	      this.listArr = listArr
	    },
	    setYMD(date) { // 设置年月日
	      date = date || new Date()
	      this.year = date.getFullYear()
	      this.month = date.getMonth() + 1
	      this.currentDay = date.getDate()
	    },
	    changeMonth(num) { // 改变月份
	      var timeFormat
      if (this.month <= 1 && num < 0) {
	        timeFormat = this.year - 1 + '-' + 12 + '-' + this.currentDay
	      } else if (this.month >= 12 && num > 0) {
	        timeFormat = this.year + 1 + '-' + 1 + '-' + this.currentDay
	      } else {
	        timeFormat = this.year + '-' + (this.month + num) + '-' + this.currentDay
	      }
	      this.setYMD(new Date(timeFormat))
	      this.dateArr(timeFormat)
	      this.$emit('changeDay', this.timeFormat)
	    },
	    changeDay(data) {
	      console.log(data)
	      if (data.sign == 0) {
	        if (this.month <= 1) {
	          this.year -= 1
          this.month = 12
	        } else {
	          this.month -= 1
	        }
	      } else if (data.sign == 2) {
	        if (this.month >= 12) {
	          this.year += 1
          this.month = 1
	        } else {
	          this.month += 1
	        }
	      }
	      this.currentDay = data.day
	      this.dateArr(this.year + '-' + this.month + '-' + this.currentDay)
	      this.$emit('changeDay', this.timeFormat)
	    },
	    position() { // 设置位置 以及绑定事件
	      var _this = this
	      if (this.el == '') return
	      var el = document.querySelector(this.el)
	      if (el == null) return
	      var dTpicker = document.querySelector('#DTpicker')
	      var obj = getAbsPoint(el)
	      var t = obj.y,
	        l = obj.x,
	        w = el.offsetWidth,
	        h = el.offsetHeight,
	        bw = document.documentElement.clientWidth || document.body.clientWidth,
	        bh = document.body.scrollHeight || document.documentElement.scrollHeight
	      if (bw - l < 260) {
	        dTpicker.style.right = 0
	      } else {
	        console.log(1)
	        dTpicker.style.left = l + 'px'
	      }
	      if (bh - t - h < 265) {
	        console.log(bh, 'bh')
	        console.log(t)
	        dTpicker.style.bottom = bh - t + 5 + 'px'
	      } else {
	        dTpicker.style.top = t + h + 5 + 'px'
	      }
	      el.addEventListener('focus', focusEvent)
	      el.addEventListener('blur', blurEvent)
	      dTpicker.addEventListener('mouseenter', mouseenterEvent)
	      dTpicker.addEventListener('mouseleave', mouseleaveEvent)
	      function focusEvent() {
	        clearTimeout(_this.timerId)
	        _this.isFocus = true
	        _this.isShow = true
	      }
	      function blurEvent() {
	        _this.isFocus = false
	        hide()
	      }
	      function mouseenterEvent() {
	        clearTimeout(_this.timerId)
	        _this.isMouseover = true
	      }
	      function mouseleaveEvent() {
	        _this.isMouseover = false
	        hide()
	      }
	      function hide() {
	        if (_this.isFocus == false && _this.isMouseover == false) {
	          _this.timerId = setTimeout(function() {
	            _this.isShow = false
	          }, 500)
	        }
	      }
	      function getAbsPoint(e) { // 获取距离左右两侧的位置
	        var x = e.offsetLeft
	        var y = e.offsetTop
	        while (e = e.offsetParent) {
	          x += e.offsetLeft
	          y += e.offsetTop
	        }
	        return { 'x': x, 'y': y }
      }
    }

	  },
	  created() {
	    this.setYMD()
	    this.dateArr(this.year + '-' + this.month + this.currentDay)
	},
	  mounted() {
	    this.position()
	}
	}
</script>
<style scoped lang="scss">
	#DTpicker {
		border: 1px solid #ccc;
		position: absolute;
		box-sizing:border-box;
		font-size: 12px;
		width: 260px;
		z-index: 999;
		position: absolute;
		padding: 5px;
		.DTpicker_t {
			line-height: 34px;
			text-align: center;
			position: relative;
			background-color: #41a9cc;
			font-weight: 700;
			color:#fff;
			span {
				font-size: 20px;
				line-height: 34px;
			}
			.DTpicker_t_l {
				position: absolute;
				top: 0;
				left: 0px;
				width: 30px;
				cursor:pointer;
			}
			.DTpicker_t_r {
				position: absolute;
				top: 0;
				right: 0px;
				width: 30px;
				cursor:pointer;
			}
		}
		.DTpicker_m {
			.gray {
				color:#ccc;
			}
		}
		th,td {
			width: 36px;
			height: 30px;
			line-height: 30px;
			text-align: center;
		}
		td {
			cursor:pointer;
		}
		td.current {
			background-color: #41a9cc;
		}
	}
	/* 设置过渡 */
	.DTpicker-enter-active, .DTpicker-leave-active {
		transition: opacity .5s
	}
	.DTpicker-enter, .DTpicker-leave-active {
		opacity: 0
	}
</style>
