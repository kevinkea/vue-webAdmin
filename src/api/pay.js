import request from '@/utils/request'

export function fetchMbrshipPay(query) {
  return request({
    url: '/pay/mbrshipPay',
    method: 'get',
    params: query
  })
}

export function fetchMbrshipPayById(query) {
	return request({
		url: '/pay/queryMbrshipById',
		method: 'get',
		params: query
	})
}

export function fetchPrice(query) {
	return request({
		url: '/pay/displayPrice',
		method: 'get',
		params: query
	})
}
