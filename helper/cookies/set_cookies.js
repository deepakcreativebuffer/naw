import { setCookie } from 'nookies'

const cookieConfig = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
}

export default (name,value) => {
    return setCookie({},name, value, cookieConfig)
}