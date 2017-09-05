import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import ArticlesPage from '../ArticlesPage/ArticlesPage';
import StocksPage from '../StocksPage/StocksPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utilities/userService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles:null
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
    fetch('api/news')
      .then( response => response.json())
      .then( data => this.setState({articles:data.articles}))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' render={(props) =>
              <MainPage
              articles={this.state.articles}
              user={this.state.user}
              handleLogout={this.handleLogout}
              />
            }/>
            <Route exact path='/stocks/:id' render={(props) =>
              <StocksPage
              {...props}
              user={this.state.user}
              handleLogout={this.handleLogout}
              />
            }/>
            <Route path='/articles/:title' render={(props) =>
              <ArticlesPage
              {...props}
              articles={this.state.articles}
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
