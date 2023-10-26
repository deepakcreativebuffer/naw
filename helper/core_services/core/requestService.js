import i18n from '../../i18n/config';
import request      from '../core/core'
import { toast } from 'react-toastify';
import {language} from '../../constants/locale'
import {loadElement} from '../../appearance/load'

export default async (endpoint, params={}, id=null, lang=language.es, flagMessage=true) => {
    // document.getElementById('rootElementLoader').style.display = 'block'
    const api_request  = await request(endpoint, params, id, lang)
    // document.getElementById('rootElementLoader').style.display = 'none'
    // const data      = await api_request
    if(api_request==null){
        if(flagMessage)
        toast(i18n.t(`Error inesperado`), {
            className: 'toast-background',
            closeButton: false,
            autoClose: 5000
        });
        return null
    }

    if( api_request.status == 'OK' ){
        return api_request
    }else{
        if(flagMessage)
        toast(`${api_request.message}`, {
            className: 'toast-background',
            closeButton: false,
            autoClose: 5000
        });
        loadElement(false)
        return null
    }

}