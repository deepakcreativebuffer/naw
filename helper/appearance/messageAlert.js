import { toast } from 'react-toastify';
import i18n from '../i18n/config';
import {loadElement} from '../appearance/load'
import { Router } from '../../routes'

export var messageAlert = (message) => {
    toast(i18n.t(`validation:${message}`), {
        className: 'toast-message-1 sty-uty-font-23-1 text-center',
        closeButton: false,
        autoClose: 5000
    });
    setTimeout(() => {
        loadElement(false)
    }, 5000)
}

export var messageAlert_url = (message, url) => {
    toast(i18n.t(`validation:${message}`), {
        className: 'toast-message-1 sty-uty-font-30-1 text-center',
        closeButton: false,
        autoClose: 5000
    });
    setTimeout(() => {
        loadElement(false)
        Router.pushRoute(url)
    }, 5000)
}