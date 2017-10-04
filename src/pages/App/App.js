import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import WatchlistPage from '../WatchlistPage/WatchlistPage';
import StocksPage from '../StocksPage/StocksPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
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
      loggedIn: false,
      currencyCompare:null,
      volume24Compare:null
    }
  }

  handleSignup = () => {
    this.setState({user: userService.getUser()});
    this.refreshData();
    this.setState({loggedIn:true})
  }

  handleLogin = () => {
    this.setState({
      user: userService.getUser(),
      loggedIn:true
    });
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
    this.setState({
      user: null,
      loggeIn:false});
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
        .then( response => response.json() )
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

  updateCurrencyCompare = (currencyProp) => {
    this.setState({currencyCompare:currencyProp})
  }

  updateVolume24Compare = (volume) => {
    this.setState({volume24Compare:volume})
  }

  currencyParams = (e) => {
    this.updateCurrency(e.target.value);
    this.getOneStockCurrency(e.target.value)
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
    console.log(header.body)
    fetch(`/api/stocks/${stockId}`, header)
    .then(response => response.json())
    .then(data => this.setState({user:data}))
  }

  updateBitcoin = (data) => {
    this.setState( { bitcoin: data })
  }

  updateOneStock = (data) => {
    this.setState({stock:data})
  }

  searchStocks = () => {
      fetch('/api/stocks').then( response => response.json())
      .then( data => this.setState({ stocks: data }))
  }

  render() {
    return (
      <div className='reset'>
        <div className="header">
          <h2 className='header-intro'>
            Every investment starts with knowledge
          </h2>
        </div>
        <NavBar
        user={this.state.user}
        handleLogout={this.handleLogout}
        />
          <Switch>
            <Route exact path='/' render={(props) =>
              <MainPage
                {...props}
                articles={this.state.articles}
                user={this.state.user}
                addToWatchlist={this.addToWatchlist}
                updateStockLink={this.updateStockLink}
                searchStocks={this.searchStocks}
                currencyParams={this.currencyParams}
                stocks={this.state.stocks}
                stock={this.state.stock}
              />
            }/>
            <Route exact path='/stocks/:id' render={(props) => {
                return(
                  <StocksPage
                    {...props}
                    user={this.state.user}
                    favstocks={this.state.favStocks}
                    addToWatchlist={this.addToWatchlist}
                    stock={this.state.stock }
                    bitcoin={this.state.bitcoin}
                    bitcoinValue={this.state.bitcoinValue}
                    updateLink={this.updateStockLink}
                    currency={this.state.currency}
                    updateOneStock={this.updateOneStock} 
                    updateCurrency={this.updateCurrency}  
                    updateBitcoin={this.updateBitcoin}
                    getOneStockCurrency={this.getOneStockCurrency}
                    currencyCompare={this.state.currencyCompare}
                    updateCurrencyCompare={this.updateCurrencyCompare}
                    updateVolume24Compare={this.updateVolume24Compare}
                    volume24Compare={this.state.volume24Compare}
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
              updateFavorites={this.updateFavorites}/> 
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
