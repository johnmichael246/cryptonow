import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Input
} from 'react-materialize';
import userService from '../../utilities/userService';

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
      .catch(err => alert('Invalid Credentials!'));
  }

  render() {
    return (
      <div className='background'>
        <Row>
          <header className="sign-up-title">Log In</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <Col s={12} offset='s3'>
              <Input s={6} type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </Col>
            <Col s={12} offset='s3'>
              <Input s={6}type="password" className="form-control" placeholder="Password" value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
            </Col>
            <Col s={12} >
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