import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import WatchlistPage from '../WatchlistPage/WatchlistPage';
import StocksPage from '../StocksPage/StocksPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import userService from '../../utilities/userService';
import tokenService from '../../utilities/tokenService';

class App extends Component {
  state = {
    user: null,
    stock: null,
    stocks: [],
    bitcoinValue: null,
    bitcoin: null,
    favStocks: [],
    currency: 'usd',
    currencyCompare:'usd',
    loggedIn: false,
    volume24Compare:null
  }

  handleSignup = () => {
    this.setState({ user: userService.getUser() })
    this.refreshData()
    this.setState({ loggedIn: true })
  }

  handleLogin = () => {
    this.setState({
      user: userService.getUser(),
      loggedIn:true
    }, () => this.refreshData())
  }

  refreshData = () => {
    this.populateUser()
  }

  handleLogout = () => {
    userService.logout()
    this.setState({
      user: null,
      loggedIn:false
    })
  }

  updateFavorites = async () => {
    const { user } = this.state
    if(user && user.favStocks.length > 0) {
      let header = this.getAuthRequestOptions('POST')
      header.headers.append('Content-Type','application/json')
      header.body = JSON.stringify({ stocks:user.favStocks })
      let response = await fetch('/api/favStocks', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer '+ tokenService.getToken() 
        },
        body: JSON.stringify({ stocks:user.favStocks })
      })
      response = await response.json()
      this.setState({ favStocks:response })
    }
  }

  getAuthRequestOptions = (method = 'GET') => {
    return {
      method,
      headers: new Headers({ 'Authorization':'Bearer '+ tokenService.getToken() }),
    }
  }

  updateCurrency = (currency) => {
    this.setState({ currency })
  }

  updateBitcoin = (bitcoin) => {
    this.setState( { bitcoin })
  }

  updateOneStock = (stock) => {
    this.setState({ stock })
  }

  updateCurrencyCompare = (currency) => {
    this.setState({ currencyCompare:currency })
  }

  updateVolume24Compare = (volume) => {
    this.setState({ volume24Compare:volume })
  }

  currencyParams = (e) => {
    let value = e.target.value
    this.updateCurrency(value)
    this.getOneStockCurrency(value)
  }

  populateUser = async () => {
    let header = this.getAuthRequestOptions()
    let response = await fetch('/api/users/populate', header)
    response = await response.json()
    this.setState({ user:response })
  }

  componentDidMount() {
    this.setState({ user: userService.getUser() })
    this.refreshData()
  }

  addToWatchlist = async (stockId, stockSymbol, name) => {
    let id = stockId
    let header = this.getAuthRequestOptions('POST')
    header.headers.append('Content-Type','application/json')
    header.body= JSON.stringify({ id, stockSymbol, name })
    let response = await fetch(`/api/stocks/${stockId}`, header)
    response = await response.json()
    this.setState({ user:response })
  }



  searchStocks = async () => {
    try {
      let response = await fetch('/api/stocks')
      response = await response.json()
      this.setState({ stocks: response })
    } catch (e) {
      console.log('Error!', e)
    }
  }

  render() {
    const { user, stocks, stock, favStocks, currency, currencyCompare, bitcoin } = this.state 
    return (
      <div className='reset'>
        <div className="header">
          <h2 className='header-intro'>
            Every investment starts with knowledge
          </h2>
        </div>
        <NavBar
        user={user}
        handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path='/' render={(props) =>
            <HomePage
              {...props}
              user={user}
              addToWatchlist={this.addToWatchlist}
              updateStockLink={this.updateStockLink}
              searchStocks={this.searchStocks}
              currencyParams={this.currencyParams}
              populateUser={this.populateUser}
              stocks={stocks}
              stock={stock}
            />
          }/>
          <Route exact path='/stocks/:id' render={(props) => {
              return(
                <StocksPage
                  {...props}
                  user={user}
                  favstocks={favStocks}
                  addToWatchlist={this.addToWatchlist}
                  stock={stock}
                  bitcoin={bitcoin}
                  bitcoinValue={this.state.bitcoinValue}
                  currency={currency}
                  updateOneStock={this.updateOneStock} 
                  updateCurrency={this.updateCurrency}  
                  updateBitcoin={this.updateBitcoin}
                  getOneStockCurrency={this.getOneStockCurrency}
                  currencyCompare={currencyCompare}
                  updateCurrencyCompare={this.updateCurrencyCompare}
                  updateVolume24Compare={this.updateVolume24Compare}
                  volume24Compare={this.state.volume24Compare}
                  getAuthRequestOptions={this.getAuthRequestOptions}
                  populateUser={this.populateUser}
                  />
              )
            }
          }/>
          <Route path='/watchlist' render={(props) =>
            <WatchlistPage
            {...props}
            user={user}
            favStocks={favStocks}
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
    )
  }
}

export default App;
