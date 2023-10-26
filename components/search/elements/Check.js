import React, {Component} from 'react';

export default class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            active: this.props.active
        }
    }

    componentDidUpdate(prevProp, prevState){
        if(prevState.active!=this.state.active){
            let {element} = this.props
            let {clickEvent} = this.props
            clickEvent(element)
        }
    }

    handleChecked = () => {
        let {active} = this.state
        this.setState({active: !active})
    }

    render(){
        let {id, name} = this.props
        let {active} = this.state
        return <>
            <div className="sty-uty-font-14-1">
                <input 
                    type="checkbox" 
                    id={`id_acti_${id}`} 
                    value={`${name}`} 
                    onClick={() => this.handleChecked()}
                    checked={active}/> {name}
            </div>
        </>
    }
    
}