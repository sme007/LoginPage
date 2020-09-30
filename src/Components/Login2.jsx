import React from 'react';
import '../Css/Login2.css';


const formValid = ({ formErrors, ...rest}) => {
    let valid = true;

     // validate form errors being empty
    Object.values(formErrors).forEach( val => { val.length > 0 && (valid = false);
    }); 

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false)

    });

    return valid;
}


class Login2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        //    email: null,
           
            formErrors: {
                email:"",
                password: ""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                Username: ${this.state.email}   
                Password: ${this.state.password}   
            `)
        }else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');            
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'email':
                formErrors.email = value.length < 3 ? 'minimum 3 character required' : "";
            break;
            case 'password':
                formErrors.password = value.length < 6 ? 'minimum 6 character required' : "";
            break;
        default:
            break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    render() {
        const { formErrors } = this.state; 
        return (
            <div className="containerWrapper">
                <div className="formWrapper">
                <h2>Login</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="email">
                            <input 
                            type="email" 
                            className={formErrors.email.length > 0 ? "error" : null} 
                            placeholder="Email" 
                            name="email" 
                            noValidate 
                            onChange={ this.handleChange }
                        /><br/>
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </div>
                    
                    <div className="password">
                        <input 
                            type="password" 
                            className={formErrors.password.length > 0 ? "error" : null} 
                            placeholder="Password"
                            name="password" 
                            noValidate 
                            onChange={ this.handleChange }
                        /><br/>
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}
                    </div>
                    <div className="login">
                        <button type="submit">Login</button>
                       
                    </div>

                </form>
                </div>
            </div>
        )
    }
}

export default Login2;