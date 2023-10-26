import { Link } from '../../routes'
import {isMobile} from 'react-device-detect';
import Image from 'next/image';
const icon = "/static/img/favicons/app/logo.png"

export const HeaderTitle =  (data) => {
    let {background, title, description} = data
    return (
    <section className="container-fluid sty-header-layout sty-uty-section-pic-brackground class-autoheight sty-title-landing" id='id-header-title'>
            <div className="sty-uty-back-section">
            <Image loader={() => background} src={background} layout='fill' priority={true} />
            </div>
            <div className="sty-curtain-1"></div>
            <div className="row justify-content-center sty-uty-min-height-parent sty-uty-padding-section-2">
                <div className="sty-logo-resp sty-content-show-resp">
                    <Link route={'index'}>
                       <Image src={icon} width='100%' height='100%'  loading="lazy"/>
                    </Link>
                </div>
                <div className="col-10 col-md-9 sty-justify-content sty-content-info">
                    <div className="row">
                        <div className="text-center col-12 sty-title sty-uty-font-1-46-1">
                            {title}
                        </div>
                    </div>
                </div>
            </div>
            {(description!=null&&!isMobile)&&
            <div className="text-center col-12 sty-subtitle sty-uty-font-12-1">
                {description}
            </div>
            }
        </section>
    )
}