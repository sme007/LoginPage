import React from 'react';
import '../Css/Login.css'


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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
            formErrors: {
                userName: "",
                password: ""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                Username: ${this.state.userName}    
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
            case 'userName':
                formErrors.firstName = value.length < 3 ? 'minimum 3 character required' : "";
            break;
            case 'password':
                formErrors.password = value.length < 6 ? 'minimum 6 character required' : "";
            break;
        default:
            break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    // state = {
    //     userName: '',
    //     userPassword: null,
    //     user: []

    //  }

    //  handleUsername = (e) => {
    //     this.setState({ userName: e.target.value.toUpperCase() })
    // }

    //  handleUserpassword = (e) => {
    //     this.setState({ userPassword: e.target.value })
    // }
    // onSubmit = (e) => {
    //     e.preventDefault();
    //     const { userName, userPassword, userUpdate } = this.state
    //     if (userName !== '' && userPassword !== '') {
    //         this.setState({ userUpdate: [userUpdate, userName, userPassword] })
    //     }
    // }

    render () {
        const { formErrors } = this.state; 
        return(
            <div className="container">
                <div className="loginContent">
                    <div className="headInfo">
                        <h2>Login</h2>                
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} placeholder="Enter Username" required/>
                        <input type="password" onChange={this.handleChange} placeholder="Enter Password" required/>
                        <input type="submit" value="Login" className="btn" />
                    </form>
                </div>
            </div>
        )
    }

}

export default Login;
