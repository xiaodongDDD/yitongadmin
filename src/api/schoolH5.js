import request from '@/utils/request'
import qs from 'qs'

// 登录
export function loginGrowup(params) {
  return request({
    url: '/quandev?v=0.1&method=user.growLogin',
    method: 'get',
    params
  })
}
// 获取banner
export function getGrowBanner(params) {
  return request({
    url: '/quandev?v=0.1&method=Growbanner.index',
    method: 'get',
    params
  })
}
// 编辑新增banner
export function handleGrowBanner(datas) {
  return request({
    url: '/quandev?v=0.1&method=Growbanner.bannerManage',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 删除banner
export function deleteGrowBanner(params) {
  return request({
    url: '/quandev?v=0.1&method=Growbanner.bannerDelete',
    method: 'get',
    params
  })
}
// 标签首页
export function getGrowLabel(params) {
  return request({
    url: '/quandev?v=0.1&method=Growlabel.index',
    method: 'get',
    params
  })
}
// 新增编辑标签
export function handleGrowLabel(datas) {
  return request({
    url: '/quandev?v=0.1&method=Growlabel.labelManage',
    method: 'post',
    data: datas
  })
}
// 删除标签
export function deleteGrowLabel(params) {
  return request({
    url: '/quandev?v=0.1&method=Growlabel.labelDelete',
    method: 'get',
    params
  })
}
// 评论管理首页
export function getGrowCommnet(datas) {
  return request({
    url: '/quandev?v=0.1&method=Growcomment.index',
    method: 'post',
    data: datas
  })
}
// 评论详情
export function growCommnetDetail(params) {
  return request({
    url: '/quandev?v=0.1&method=Growcomment.commentDetail',
    method: 'get',
    params
  })
}
// 评论回复
export function growCommnetReply(datas) {
  return request({
    url: '/quandev/api/?v=0.1&method=Growcomment.commentReply',
    method: 'post',
    data: datas
  })
}
// 评论置顶，取消置顶
export function handleGrowCommnet(datas) {
  return request({
    url: '/quandev?v=0.1&method=Growcomment.commentStick',
    method: 'post',
    data: datas
  })
}
// 评论审核通过
export function commentPass(params) {
  return request({
    url: '/quandev?v=0.1&method=Growcomment.commentPass',
    method: 'get',
    params
  })
}
// 评论回复删除
export function replyDelete(params) {
  return request({
    url: '/quandev?v=0.1&method=Growcomment.replyDelete',
    method: 'get',
    params
  })
}
// 作者管理首页
export function getAuthor(params) {
  return request({
    url: '/quandev?v=0.1&method=Growauthor.index',
    method: 'get',
    params
  })
}
// 新增编辑作者
export function handleAuthor(datas) {
  return request({
    url: '/quandev?v=0.1&method=Growauthor.authorManage',
    method: 'post',
    data: datas
  })
}
