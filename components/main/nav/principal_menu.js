import React, {Component} from 'react'
import { Link } from '../../../routes'

const close = "/static/img/favicons/menu/close.svg"

export default class extends Component{
    constructor(props){
        super(props)
    }

    handleHideMenu = () => {
        let menu = document.getElementById("id-principal-menu")
        menu.classList.add("sty-principal-menu-animation-2")
        menu.addEventListener("animationend", () => {
            if (event.animationName !== 'hideMenu') {
                return;
            }
            menu.style.visibility = "hidden"
            menu.classList.remove("sty-principal-menu-animation-2")
        });   
    }

    render(){
        return <>
            <div className="sty-principal-menu sty-justify-content" id="id-principal-menu">
                {/* <div className="sty-content-button">
                    <div className="sty-button" onClick={this.handleHideMenu}>
                        <img src={close}/>
                    </div>
                </div> */}
                <div className="sty-justify-content">
                    <div className="sty-content-links text-center">
                        <div>
                            <Link route="about_us">
                                <a className="cool-link">Quiénes somos</a>
                            </Link>
                        </div>
                        <div>
                            <Link route="how_work">
                                <a className="cool-link">Cómo trabajamos</a>
                            </Link>
                        </div>
                        <div>
                            <Link route="who_work">
                                <a className="cool-link">Con quién trabajamos</a>
                            </Link>
                        </div>
                        <div>
                            <Link route="allies">
                                <a className="cool-link">Nuestros aliados</a>
                            </Link>
                        </div>
                        <div>
                            <Link route="say_about_us">
                                <a className="cool-link">Qué dicen de nosotros</a>
                            </Link>
                        </div>
                        <div>
                            <Link route="how_help">
                                <a className="cool-link" href="#">¿Cómo puedes ayudar?</a>
                            </Link>
                        </div>
                        <div>
                            <Link route="faqs">
                                <a className="cool-link" href="#">Preguntas frecuentes</a>
                            </Link>
                        </div>
                        <div><a className="cool-link" href="#">Galerías</a></div>
                    </div>
                </div>
            </div>
        </>
    } 
}