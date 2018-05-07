import request from '@/utils/request'

export function getSchoolH5List(params) {
  return request({
    url: '&v=0.1&method=Yi.feedbackList',
    method: 'get',
    params
  })
}

export function saveFeedbackInfo(params) {
  return request({
    url: '&v=0.1&method=Yi.feedbackInfoSave',
    method: 'post',
    params
  })
}
