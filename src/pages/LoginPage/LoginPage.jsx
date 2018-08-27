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

    updateMessage = (message) => {
        this.setState({ message })
    }

    render() {
        return (
            <div className='background'>
                <LoginForm
                    updateMessage={this.updateMessage}
                    {...this.props}
                 />
                <p><b>{this.state.message}</b></p>
            </div>
        )
    }
}

export default LoginPage;

