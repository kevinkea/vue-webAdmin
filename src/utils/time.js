export function formatDate (date, type) {
  var myyear = date.getFullYear()
  var mymonth = date.getMonth() + 1
  var myday = date.getDate()
  var myweekday = date.getDay()
  var myhour = date.getHours()
  var mymin = date.getMinutes()
  // type 为 weekday则格式为表格标题所显示的格式 ；为date格式为2016-04-03 ，其它 则返回用于单元格ID相关格式
  if (type === 'weekday') {
    return ('' + mymonth + '-' + myday)
  } else if (type === 'mydate') {
    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myday < 10) {
      myday = '0' + myday
    }
    return ('' + mymonth + '-' + myday)
  } else if (type === 'date') {
    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myday < 10) {
      myday = '0' + myday
    }
    return (myyear + '-' + mymonth + '-' + myday)
  } else {
    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myday < 10) {
      myday = '0' + myday
    }
    if (myhour < 10) {
      myhour = '0' + myhour
    }
    if (mymin < 10) {
      mymin = '0' + mymin
    }
    return (myyear + '-' + mymonth + '-' + myday + ' ' + myhour + ':' + mymin)
  }
}

export function getWeekDate (date, day) {
  var nowDayOfWeek = date.getDay() // 今天本周的第几天
  var nowDay = date.getDate() // 当前日
  var nowMonth = date.getMonth() // 当前月
  var nowYear = date.getYear() // 当前年
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + day)
  return weekStartDate
}

export function getWeek (date) {
  var dateTime = date.getDay()
  var weekName = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
  return weekName[dateTime]
}
