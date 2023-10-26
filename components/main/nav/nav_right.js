import React, {Component} from 'react'
import { Link } from '../../../routes'

const menu_1 = '/static/img/favicons/menu/menu_1.png'
const menu_2 = '/static/img/favicons/menu/menu_2.png'
const menu_3 = '/static/img/favicons/menu/menu_3.png'
const menu_4 = '/static/img/favicons/menu/menu_4.jpg'

export default class extends Component{

    render(){
        return <>
            <div className="sty-navbar-left sty-justify-content-center">
                <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <Link route="donation">
                        <a>
                            <div className="sty-option-1 sty-justify-content sty-menu-hover-right">
                                <div className="sty-img">
                                    <img src={menu_1} />
                                </div>
                            </div>
                        </a>
                        </Link>
                    </div>
                    <div className="col-12">
                        <Link route="who_work">
                        <a>
                            <div className="sty-option-4 sty-justify-content sty-menu-hover-right">
                                <div className="sty-img">
                                    <img src={menu_4} />
                                </div>
                            </div>
                        </a>
                        </Link>
                    </div>
                    <div className="col-12">
                        <Link route="who_work">
                        <a>
                            <div className="sty-option-3 sty-justify-content sty-menu-hover-right">
                                <div className="sty-img">
                                    <img src={menu_3} />
                                </div>
                            </div>
                        </a>
                        </Link>
                    </div>
                    <div className="col-12">
                        <a href="http://siq-quiera.org.mx/login">
                            <div className="sty-option-2 sty-justify-content sty-menu-hover-right">
                                <div className="sty-img">
                                    <img src={menu_2} />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </>
    } 
}