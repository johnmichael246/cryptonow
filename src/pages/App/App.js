import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import MainPage from '../MainPage/MainPage';
import ArticlesPage from '../ArticlesPage/ArticlesPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utilities/userService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  handleSignup = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogin = () => {
    this.setState({user:userService.getUser()})
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header color">
          CryptoNow
        </div>
        <NavBar
        user={this.state.user}
        handleLogout={this.handleLogout}/>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <MainPage
              user={this.state.user}
              />
            }/>
            <Route exact path='/Articles' render={() =>
              <ArticlesPage
              user={this.state.user}
              />
            }/>
            <Route exact path='/login' render={(props)=>
            <LoginPage
            handleLogin={this.handleLogin}
             />
            }/>
            <Route exact path='/signup' render={(props)=>
            <SignupPage
            {...props}
            handleSignup={this.handleSignup}
            />
            }/>
          </Switch>        
        </Router>

      </div>
    );
  }
}

export default App;
