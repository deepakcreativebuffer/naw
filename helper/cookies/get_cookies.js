import { parseCookies } from 'nookies'

export default (name) => {
    const cookies = parseCookies()
    return cookies[name]
}