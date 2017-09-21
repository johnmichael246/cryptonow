import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import MainPage from '../MainPage/MainPage';
import WatchlistPage from '../WatchlistPage/WatchlistPage';
import StocksPage from '../StocksPage/StocksPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utilities/userService';
import tokenService from '../../utilities/tokenService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      user: null,
      stocks: [],
      stock: null,
      bitcoin: null,
      bitcoinValue: null,
      currency: 'usd',
      favStocks: [],
    }
  }

  handleSignup = () => {
    this.setState({user: userService.getUser()});
    this.refreshData();
  }

  handleLogin = () => {
    this.setState({user: userService.getUser()});
    this.refreshData();
  }

  refreshData = () => {
    console.log('app > refreshdata()')
    this.populateUser();
    fetch('/api/news')
      .then( response => response.json())
      .then( data => this.setState({articles:data.articles}))
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  updateFavorites = () => {
    console.log('App > updateFavorites > this.state.user =', this.state.user)
    if(this.state.user) {
        let header = new Headers({'Authorization':'Bearer '+ tokenService.getToken()});
        header.append('Content-Type','application/json')
        let mainBody = JSON.stringify({stocks:this.state.user.favStocks})
        fetch('/api/favStocks', {
            method:'post',
            headers:header,
            body:mainBody 
        })
        .then( response => response.json())
        .then( data => this.setState({favStocks:data}))
    }
  }

  getAuthRequestOptions = (method) => {
      return {
          method: method,
          headers: new Headers({'Authorization':'Bearer '+ tokenService.getToken()}),
      }
  }

  updateStockLink = (stock) => {
    this.setState({stock:stock})
  }

  updateCurrency = (currency) => {
    this.setState({currency:currency})
  }

  currencyParams = (e) => {
    this.setState({currency: e.target.value})
    this.getOneStockCurrency(e.target.value)
  }

  getOneStockCurrency = (currency) => {
    let header = this.getAuthRequestOptions('POST');
    header.headers.append('Content-Type','application/json');
    header.body=JSON.stringify({currency:currency, id:this.state.stock[0].id})
    fetch(`/api/stocks/${this.state.stock[0].id}/${this.state.currency}`, header)
    .then( response => response.json())
    .then( data => this.setState({stock:data}))
  }

  populateUser = () => {
    let header = this.getAuthRequestOptions('GET');
    fetch('/api/users/populate', header)
    .then( response => response.json())
    .then( data => this.setState({user:data}))
    .then( ()=> this.updateFavorites())
  }

  componentDidMount() {
    console.log('app > component mounted')
    this.setState({user: userService.getUser()});
    this.refreshData();
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

   updateBitcoin = (data) => {
    this.setState( { bitcoin: data })
  }

  updateOneStock = (data) => {
    this.setState( { stock: data })
    console.log(`Current stock is: ${this.state.stock} and expected stock is ${JSON.stringify(data)}`)
  }

  searchStocks = () => {
      fetch('/api/stocks').then( response => response.json())
      .then( data => this.setState({ stocks: data }))
  }

  setTimer = () => {
    setInterval(() =>{
      console.log('the timer has started')
    this.searchStocks()
  }, 120000)
  }

  clearTimer= () => {
    console.log('the timer has been cleared')
    clearInterval(this.setTimer)
  }

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) =>
            <MainPage
              {...props}
              articles={this.state.articles}
              user={this.state.user}
              handleLogout={this.handleLogout}
              addToWatchlist={this.addToWatchlist}
              updateStockLink={this.updateStockLink}
              searchStocks={this.searchStocks}
              currencyParams={this.currencyParams}
              stocks={this.state.stocks}
              stock={this.state.stock}
              setTimer={this.setTimer}
            />
          }/>
          <Route exact path='/stocks/:id' render={(props) => {
              return(
                <StocksPage
                  favstocks={this.state.favStocks}
                  {...props}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  addToWatchlist={this.addToWatchlist}
                  stock={this.state.stock }
                  bitcoin={this.state.bitcoin}
                  bitcoinValue={this.state.bitcoinValue}
                  updateLink={this.updateStockLink}
                  currency={this.state.currency}
                  currencyParams={this.currencyParams}   
                  updateCurrency={this.updateCurrency}  
                  updateOneStock={this.updateOneStock}
                  updateStockLink={this.updateStockLink}
                  updateBitcoin={this.updateBitcoin} 
                  clearTimer={this.clearTimer}         
                  />
              )
            }
          }/>
          <Route path='/watchlist' render={(props) =>
            <WatchlistPage
            {...props}
            user={this.state.user}
            favStocks={this.state.favStocks}
            updateFavStockState={this.updateFavStockState}
            stock={this.state.stock}
            updateFavorites={this.updateFavorites}
            />
          }/>
          <Route exact path='/login' render={(props)=>
            <LoginPage
            {...props}
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
      </div>
    );
  }
}

export default App;
