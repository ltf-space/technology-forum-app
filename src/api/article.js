import service from "../utils/request"
// 首页顶部滑动条
export function FindAllType() {
    return service({
        url: '/article/type/all',
        method: 'get',
    })
}
// 保存文章
export function SaveArticle(data) {
    return service({
        url: '/article',
        method: 'post',
        data: data
    })
}
// 根据类型查找文章
export function FindAllArticle(type) {
    return service({
        url: '/article?type=' + type,
        method: 'get',
    })
}
// 查看内容详情
export function FindArticleById(id) {
    return service({
        url: '/article/' + id,
        method: 'get',
    })
}
// 搜索文章
export function SearchArticle(value) {
    return service({
        url: '/article/search/' + value,
        method: 'get',
    })
}
// 点赞文章
export function Agree(id) {
    return service({
        url: '/article/agree/' + id,
        method: 'get',
    })
}
// 根据用户查找文章
export function userArticle(uid) {
    return service({
        url: '/article/uid/' + uid,
        method: 'get',
    })
}
// 根据用户uid和文章id删除文章
export function delUserArticle(uid,aid) {
    return service({
        url: `/article/uid/${uid}/${aid}`,
        method: 'get',
    })
}