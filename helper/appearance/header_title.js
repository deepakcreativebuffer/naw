import { Link } from '../../routes'
import Image from 'next/image';
const icon = "/static/img/favicons/app/logo.png"

export const HeaderTitle = (data) => {
    let { background, title } = data
    return (
        <section className="container-fluid sty-header-layout sty-uty-section-pic-brackground class-autoheight">
            <div className="sty-uty-back-section">
                <Image loader={() => background} src={background} layout='fill' priority={true} />
            </div>
            <div className="sty-curtain-1"></div>
            <div className="row justify-content-center sty-uty-min-height-parent sty-uty-padding-section-3">
                <div className="sty-logo-resp sty-content-show-resp">
                    <Link route={'index'}>
                        <Image src={icon} width='100%' height='100%' loading="lazy" />
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
        </section>
    )
}