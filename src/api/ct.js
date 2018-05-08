import request from '@/utils/request'

export function fetchSchedule() {
  return request({
    url: '/ct/queryClassSchedule',
    method: 'get'
  })
}

export function fetchLesson() {
	return request({
		url: '/set/queryLessonSetForSelectList',
		method: 'get'
	})
}
