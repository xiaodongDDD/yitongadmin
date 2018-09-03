import request from '@/utils/request'
import qs from 'qs'

// 登录
export function loginGrowup(params) {
  return request({
    url: '/growth/?v=0.1&method=user.growLogin',
    method: 'get',
    params
  })
}
// 获取banner
export function getGrowBanner(params) {
  return request({
    url: '/growth/?v=0.1&method=Growbanner.index',
    method: 'get',
    params
  })
}
// 编辑新增banner
export function handleGrowBanner(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growbanner.bannerManage',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 删除banner
export function deleteGrowBanner(params) {
  return request({
    url: '/growth/?v=0.1&method=Growbanner.bannerDelete',
    method: 'get',
    params
  })
}
// 标签首页
export function getGrowLabel(params) {
  return request({
    url: '/growth/?v=0.1&method=Growlabel.index',
    method: 'get',
    params
  })
}
// 新增编辑标签
export function handleGrowLabel(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growlabel.labelManage',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 删除标签
export function deleteGrowLabel(params) {
  return request({
    url: '/growth/?v=0.1&method=Growlabel.labelDelete',
    method: 'get',
    params
  })
}
// 评论管理首页
export function getGrowCommnet(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.index',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 评论开启/关闭
export function changeCommnetStatus(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.commentStatus',
    method: 'get',
    params
  })
}
// 评论详情
export function growCommnetDetail(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.commentDetail',
    method: 'get',
    params
  })
}
// 评论回复
export function growCommnetReply(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.commentReply',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 评论置顶，取消置顶
export function handleGrowCommnet(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.commentStick',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 评论审核通过
export function commentPass(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.commentPass',
    method: 'get',
    params
  })
}
// 评论回复删除
export function replyDelete(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcomment.replyDelete',
    method: 'get',
    params
  })
}
// 作者管理首页
export function getAuthor(params) {
  return request({
    url: '/growth/?v=0.1&method=Growauthor.index',
    method: 'get',
    params
  })
}
// 新增编辑作者
export function handleAuthor(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growauthor.authorManage',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 文章首页
export function getArticle(params) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.indexSearch',
    method: 'get',
    params
  })
}
// 文章上下架
export function articleUpDown(params) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.articleUpDown',
    method: 'get',
    params
  })
}
// 文章删除
export function articleDelete(params) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.articleDelete',
    method: 'get',
    params
  })
}
// 文章新增编辑
export function articleManage(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.articleManage',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 文章详情
export function articleDetail(params) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.articleDetail',
    method: 'get',
    params
  })
}
// 作者搜索
export function authorSearch(params) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.authorSearch',
    method: 'get',
    params
  })
}
// 标签搜索
export function labelSearch(params) {
  return request({
    url: '/growth/?v=0.1&method=Growarticle.labelSearch',
    method: 'get',
    params
  })
}
// 栏目列表
export function columnLists(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getColumns',
    method: 'get',
    params
  })
}
// 栏目信息
export function columnInfo(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getColumn',
    method: 'get',
    params
  })
}
// 保存栏目
export function columnSave(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.addColumn',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 发布文章
export function columnPublish(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.publish',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 专栏列表
export function columnScols(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getScols',
    method: 'get',
    params
  })
}

// 一级目录
export function columnCatalogs(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getCatalogs',
    method: 'get',
    params
  })
}
// 搜索文章
export function columnArticles(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.searchArticle',
    method: 'get',
    params
  })
}
// 专栏列表
export function pageList(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getSpecialColumns',
    method: 'get',
    params
  })
}
// 专栏详情
export function pageInfo(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getSpecialColumn',
    method: 'get',
    params
  })
}
// 保存专栏
export function pageSave(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.addSpecialColumn',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 删除专栏
export function pageDelete(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.delSpecialColumn',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 置顶列表
export function topList(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getStickArticles',
    method: 'get',
    params
  })
}
// 置顶详情
export function topInfo(params) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.getOneStick',
    method: 'get',
    params
  })
}
// 置顶保存
export function topSave(datas) {
  return request({
    url: '/growth/?v=0.1&method=Growcolumn.addStick',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 期刊首页
export function termIndex(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.index',
    method: 'get',
    params
  })
}
// 期刊新增编辑
export function termManage(datas) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.termManage',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 期刊删除
export function termDelete(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.termDelete',
    method: 'get',
    params
  })
}
// 期刊详情
export function termDetail(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.termDetail',
    method: 'get',
    params
  })
}
// 期刊发布
export function termPublish(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.termPublish',
    method: 'get',
    params
  })
}
// 版面首页
export function versionIndexSearch(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.indexSearch',
    method: 'get',
    params
  })
}
// 版面新增修改
export function versionManage(datas) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.versionManage ',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// 版面删除
export function versionDelete(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.versionDelete',
    method: 'get',
    params
  })
}
// 版面文章搜索
export function articleSearch(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.articleSearch',
    method: 'get',
    params
  })
}
// 版面标签搜索
export function versionLabelSearch(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.labelSearch',
    method: 'get',
    params
  })
}
// 版面详情
export function versionDetail(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.versionDetail',
    method: 'get',
    params
  })
}
// 版面标签新增保存
export function versionSaveLabel(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.saveLabel',
    method: 'get',
    params
  })
}
// 期刊列表
export function termList(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.termList',
    method: 'get',
    params
  })
}  
// 版面分类
export function versionLabel(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyVersion.versionLabel',
    method: 'get',
    params
  })
}
// 期刊数据统计
export function termStatistics(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.termStatistics',
    method: 'get',
    params
  })
}

// 期刊数据导出
export function exportUrl(params) {
  return request({
    url: '/growth/?v=0.1&method=GrowWeeklyTerm.exportUrl',
    method: 'get',
    params
  })
}