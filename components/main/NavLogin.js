// import i18n from '../../helper/i18n/config';
import {sessionMX, sessionCA, countries} from '../../helper/countries/enums'
import { Link, Router } from '../../routes'
import {remove as removeCookie} from 'es-cookie';
import {getTokenCountry} from '../../helper/cookies/get_cookies_initial'

import NavCanada from './navs/NavBarLoginCa'
import NavMexico from './navs/NavBarLoginMx'

import navStyles from '../../styles/widgets/navbar'

import createroute from '../../helper/createLanguageRoute'
import externalurl from '../../constants/externalurl'


export default class Layout extends React.Component {

    constructor(props) {
        super(props)

        this.toggle       = this.toggle.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)

        this.state = {
            isOpen:   false,
            classBar: false,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.language!=this.props.language){
            this.setState({language: null})
        }
    }

    componentDidMount(){
      const { flagScrollNav }=this.props
      if(flagScrollNav)
        window.addEventListener('scroll', this.handleScroll)
      else
        this.setState({
          classBar: true,
        })
    }
    
    componentWillUnmount(){
      const { flagScrollNav }=this.props
      if(flagScrollNav)
        window.removeEventListener('scroll', this.handleScroll)
      else
        this.setState({
          classBar: true,
        })
    } 

    handleScroll(){

      var lastScrollY = window.scrollY
      if(lastScrollY>=90){
        this.setState({
          classBar: true,
        })
      }else{
        this.setState({
          classBar: false,
        })
      }
    }

    handleChangeLanguage(e){
      const { currentUrl } = this.props
      let language = e.currentTarget.lang
      if( typeof( currentUrl ) === 'undefined' )
        Router.pushRoute('canada', {lang: language})
      else{
        var url = createroute(currentUrl, language)
        Router.pushRoute(url)
      }
    }

    handleLogOut(){
        const {country, language, handleChangeNav} = this.props

        if(country==countries.mx){
          removeCookie(sessionMX.userId)
          removeCookie(sessionMX.token)
          removeCookie(sessionMX.pic)
          removeCookie(sessionMX.host)
          
          Router.pushRoute('index')
        }
        if(country==countries.ca){
          removeCookie(sessionCA.userId)
          removeCookie(sessionCA.token)
          removeCookie(sessionCA.pic)
          removeCookie(sessionCA.host)
          
          Router.pushRoute('canada', {country: country, lang: language})
        }
      
        handleChangeNav(1)
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const {country, language} = this.props
        const { userPic, cookies } = this.props

        let classNavS = this.state.classBar
        let classNavC = null
        let token = getTokenCountry(country)
        let host  = null
        if(country==countries.mx){
          host = cookies[sessionMX.host]=='false'?false:true
        }
        if(country==countries.ca){
          host = cookies[sessionCA.host]=='false'?false:true
        }

        let urlOldDashboard = `${externalurl.urlOldDashboard}${token}`

        if( classNavS ){
          classNavC = "nextNavBarS"
        }

        return <section>

          {(country==countries.ca)&&
          <NavCanada 
            country={country}
            language={language}
            handleChangeLanguage={this.handleChangeLanguage}
            handleLogOut={this.handleLogOut}
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            classNavC={classNavC}
            userPic={userPic}
            caHost={host}
            urlOldDashboard={urlOldDashboard}
          />
          }
          {(country==countries.mx)&&
          <NavMexico
            country={country}
            language={language}
            handleChangeLanguage={this.handleChangeLanguage}
            handleLogOut={this.handleLogOut}
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            classNavC={classNavC}
            userPic={userPic}
            caHost={host}
            urlOldDashboard={urlOldDashboard}
          />
          }

          <style jsx>
            {navStyles}
          </style>
        </section>
    }

}