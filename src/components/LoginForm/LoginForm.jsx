import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Input
} from 'react-materialize';
import userService from '../../utilities/userService';
import './LoginForm.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
        this.props.history.push('/');
      })
      .catch(err => this.props.updateMessage(err.message));
  }

  render() {
    return (
      <div className='background'>
        <Row>
          <br/><br/>
          <header className="sign-up-title">Log In</header>
          <br/><br/>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <Col s={12} offset='s3'>
              <Input s={6} type="email" className="form-control" placeholder="Email" autocomplete='off'value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </Col>
            <Col s={12} offset='s3'>
              <Input s={6}type="password" className="form-control" placeholder="Password" autocomplete='off'value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
            </Col>
            <Col s={12} >
            <br/>
              <button className="btn btn-default"style={ {color:'black',fontFamily:'Space Mono, Monospace'} }>Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'style={ {color:'black',fontFamily:'Space Mono, Monospace'} }>CANCEL</Link>
            </Col>
          </form>
        </Row>
      </div>
    );
  }
};

export default LoginForm;