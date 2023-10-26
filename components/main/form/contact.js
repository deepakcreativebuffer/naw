import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { rulesValidation } from '../../../helper/forms/rulesValidations'
import renderInput from '../../../helper/forms/input'

const validate = values => {
    var fields = [
        {
            nameField: 'name', 
            required: true
        },
        {
            nameField: 'phone', 
            required: true
        },
        {
            nameField: 'email', 
            required: true,
            formatMail: true
        },
        {
            nameField: 'message', 
            required: true
        }
    ]

    var errors = rulesValidation( fields, values );

    return errors
}

class FormContact extends React.Component {

    test = (e) => {
        let value = e.currentTarget.value
        let id = e.currentTarget.id
        let element = null
        element = document.getElementById(id)
        if(value!=""){
            element.classList.add("sty-uty-use")
        }else{
            element.classList.remove("sty-uty-use")
        }
    }

    render(){
    
        const { handleSubmit } = this.props;

        return (
                <form onSubmit={ handleSubmit }>
                    <div className="col-12 sty-uty-form">
                        <div className="row">
                            <div className="col-12 sty-padding-sides">
                                <div className="sty-uty-input">
                                    <Field
                                        tag={"Nombre"}
                                        component={renderInput}
                                        type="text"
                                        className="sty-uty-field"
                                        name="name"
                                        onChange={this.test}
                                        id={"contact-1"}
                                        // placeholder={t('form:place_holder_email')}            
                                    />
                                </div>
                            </div>
                            <div className="col-6 sty-padding-sides">
                                <div className="sty-uty-input">
                                    <Field
                                        tag={"Teléfono"}
                                        component={renderInput}
                                        type="number"
                                        className="sty-uty-field"
                                        name="phone"
                                        onChange={this.test}
                                        id={"contact-2"}
                                        // placeholder={t('form:place_holder_email')}            
                                    />
                                </div>
                            </div>
                            <div className="col-6 sty-padding-sides">
                                <div className="sty-uty-input">
                                    <Field
                                        tag={"Correo"}
                                        component={renderInput}
                                        type="text"
                                        className="sty-uty-field"
                                        name="email"
                                        onChange={this.test}
                                        id={"contact-3"}
                                        // placeholder={t('form:place_holder_email')}            
                                    />
                                </div>
                            </div>
                            <div className="col-12 sty-padding-sides">
                                <div className="sty-uty-input">
                                    <Field
                                        tag={"Mensaje"}
                                        component={renderInput}
                                        type="text"
                                        className="sty-uty-field"
                                        name="message"
                                        onChange={this.test}
                                        id={"contact-4"}
                                        // placeholder={t('form:place_holder_email')}            
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center sty-uty-cont-button">
                            <button className="sty-button-1">
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </form>
            );
    }
}

FormContact = reduxForm({
  form: 'FormContact',
  validate,
})(FormContact);

export default ( FormContact );