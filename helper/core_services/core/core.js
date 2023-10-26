import 'isomorphic-fetch'
import {language} from '../../constants/locale'

export default function request(endpoint, params=null, id=null, lang=language.es) {
    let {url, typeRequest} = endpoint
    let configRequest = {
        headers:{
            'Accept': 'application/json',
            'Accept-Language': lang
        }
    }

    if(id!=null)
    url=url.replace("#", id);
    switch(typeRequest){
        case 'get':
            configRequest.headers['Content-Type'] = "application/json"
            configRequest['method'] = "GET"
            if( params !== null ){
                var elements = []
                Object.keys( params ).forEach((key) => {
                    elements.push(`${key}=${encodeURIComponent(params[key])}`)
                });
                url = `${url}?${elements.join('&')}`
            }
        break

        case 'post':
            configRequest.headers['Content-Type'] = "application/json"
            configRequest['method'] = "POST"
            if( params != null )
                configRequest['body'] = JSON.stringify(params)
        break
        
        default:
        break
    }

    return fetch(url,configRequest)
    .then(res => {
        var data = res.json()
        return data;
    })
    .catch(error => { 
        console.error('Error:', error)
        return null;
    })
}