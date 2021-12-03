import service from "../utils/request"

export function SaveVideo(data) {
    return service({
        url: '/video',
        method: 'post',
        data: data
    })
}

export function FindAllVideo() {
    return service({
        url: '/video',
        method: 'get'
    })
}
// 根据用户查找视频
export function userVideo(uid) {
    return service({
        url: '/video/uid/' + uid,
        method: 'get'
    })
}
// 根据用户uid和文章id删除视频
export function delUserVideo(uid,vid) {
    return service({
        url: `/video/uid/${uid}/${vid}`,
        method: 'get',
    })
}