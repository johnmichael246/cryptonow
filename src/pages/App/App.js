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
import tokenService from '../../utilities/tokenService';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles:null,
      user: null,
      currentStocks:[],
      stock:null,
      bitcoin:null,
      bitcoinValue:null,
      button:null
    }
  }

  handleSignup = () => {
    this.setState({user: tokenService.getUser()});
  }

  handleLogin = () => {
    this.setState({user:userService.getUser()})
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  getAuthRequestOptions=(method)=> {
      return {
          method: method,
          headers: new Headers({'Authorization':'Bearer '+ tokenService.getToken()}),
      }
  }

  updateStockLink=(stock)=> {
    this.setState({stock:stock})
  } 


  populateUser = () => {
    let header=this.getAuthRequestOptions('GET');
    fetch('/api/users/populate', header)
    .then( response => response.json())
    .then( data => this.setState({user:data}))
  }

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
    this.populateUser();
    fetch('/api/news')
      .then( response => response.json())
      .then( data => this.setState({articles:data.articles}))
  }

  addToWatchlist = (stockId,stockSymbol,name) => {
    let id = stockId
    let header = this.getAuthRequestOptions('POST');
    header.headers.append('Content-Type','application/json')
    header.body= JSON.stringify({id, stockSymbol, name})
    fetch(`/api/stocks/${stockId}`, header)
    .then(response => response.json())
    .then(data => this.setState({user:data}))
  }

  render() {
    if (!this.state.user) {
      return (
        <div>Loading</div>
      )
    }
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' render={(props) =>
              <MainPage
              articles={this.state.articles}
              user={this.state.user}
              handleLogout={this.handleLogout}
              addToWatchlist={this.addToWatchlist}
              />
            }/>
            <Route exact path='/stocks/:id' render={(props) => {
                return(
                  <StocksPage
                  favstocks={this.state.user.favstocks}
                  {...props}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  addToWatchlist={this.addToWatchlist}
                  stock={this.state.stock}
                  bitcoin={this.state.bitcoin}
                  bitcoinValue={this.state.bitcoinValue}
                  getOneStock={this.getOneStock}
                  updateLink={this.updateStockLink}
                  />
                )
              }
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
