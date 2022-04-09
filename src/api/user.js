import service from "../utils/request"

export function Login(data){
    return service({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export function SaveUser(data) {
    return service({
        url: '/user',
        method: 'post',
        data: data
    })
}
export function updataPwd(userId,form) {
    return service({
        url: `/user/update/${userId}/${form.password}/${form.newPassword}`,
        method: 'post',
    })
}
export function updataNickeName(userId,nickeName) {
    return service({
        url: `/user/update/${userId}/${nickeName}`,
        method: 'post',
    })
}