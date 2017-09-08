import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

class LoginPage extends React.Component  {
    constructor() {
        super();
        this.state = {
            message:''
        }
    }

    updateMessage = (msg) => {
        this.setState({message: msg});
    }

    render() {
        return (
            <div>
                <LoginForm
                    updateMessage={this.updateMessage}
                    {...this.props}
                 />
                <p>{this.state.message}</p>
            </div>
        )
    }
}

export default LoginPage;

