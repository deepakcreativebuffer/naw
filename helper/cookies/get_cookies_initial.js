import { parseCookies } from 'nookies'
import cookieparse from 'cookie-parse'

export default (ctx, req) => {
    let cookies = {}
    if(typeof(req)!='undefined'&&req!=null){
        if(typeof(req.headers.cookie)!='undefined')
        cookies = cookieparse.parse(req.headers.cookie)
    }else
        cookies = parseCookies(ctx)
    return cookies
}
