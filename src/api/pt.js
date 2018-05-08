import request from '@/utils/request'

export function fetchSignPaid(query) {
  return request({
    url: '/pt/querySignPaid',
    method: 'get',
    params: query
  })
}
