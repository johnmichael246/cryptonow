import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SignupForm.css';
import userService from '../../utilities/userService';
import {
  Input,
  Row,
  Col
} from 'react-materialize';


class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    this.props.updateMessage('');
    this.setState({
      [field]: e.target.value
    });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      .then(() => {
        this.props.handleSignup();
        this.props.history.push('/');
      })
      // invalid user data
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className='background'>
        <Row>
        <header className='sign-up-title'>Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <Col s={12}>
            <Input s={9} m={6}type="text" offset='m3' className="form-control" placeholder="Name" autoComplete='off' value={this.state.name} onChange={(e) => this.handleChange('name', e)}/>
          </Col>
          <Col s={12}>
            <Input s={9} m={6} type="email" className="form-control" placeholder="Email" autoComplete='off' value={this.state.email} onChange={(e) => this.handleChange('email', e)}/>
          </Col>
          <Col s={12}>
            <Input s={9} m={6} type="password" className="form-control" placeholder="Password" autoComplete='off' value={this.state.password} onChange={(e) => this.handleChange('password', e)}/>
          </Col>
          <Col s={12}>          
            <Input className='border' s={9} m={6} type="password" className="form-control" placeholder="Confirm Password" autoComplete='off' value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
          </Col>            
          <Col s={12}>
            <button className="btn btn-default" style={ {color:'black',fontFamily:'Space Mono, Monospace'} }disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            <Link to='/' className='cancel-link' style={ {color:'black',fontFamily:'Space Mono, Monospace'} }>CANCEL</Link>
          </Col>
        </form>
        </Row>
      </div>
    );
  }
};

export default SignupForm;