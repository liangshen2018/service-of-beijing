import router from './router'
import { getToken } from '@/utils/auth' // getToken from cookie
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    if (getToken()) {
        next()
    } else {
        // if (whiteList.indexOf(to.path) !== -1) {
        //     next()
        // } else {
        //     next(`/login) // 否则全部重定向到登录页
        // }
        next()
    }
    if (to.meta.title) {
        document.title = to.meta.title
    }
})
