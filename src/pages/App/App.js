import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route,
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
  state = {
    articles: [],
    user: null,
    stock: null,
    stocks: [],
    bitcoinValue: null,
    bitcoin: null,
    favStocks: [],
    currency: 'usd',
    currencyCompare:null,
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

  refreshData = async () => {
    // this.populateUser()
    // let response = await fetch('/api/news')
    // response = await response.json()
    // this.setState({ articles:response.articles })
  }

  handleLogout = () => {
    userService.logout()
    this.setState({
      user: null,
      loggeIn:false
    })
  }

  updateFavorites = async () => {
    if(this.state.user) {
      let header = this.getAuthRequestOptions('POST')
      header.append('Content-Type','application/json')
      let mainBody = JSON.stringify({stocks:this.state.user.favStocks})
      let response = await fetch('/api/favStocks', {
        headers:header,
        body:mainBody 
      })
      response = await response.json()
      this.setState({ favStocks:response })
    }
  }

  getAuthRequestOptions = (method = 'GET') => {
    return {
      method: method,
      headers: new Headers({ 'Authorization':'Bearer '+ tokenService.getToken() }),
    }
  }

  updateStockLink = (stock) => {
    this.setState({ stock })
  }

  updateCurrency = (currency) => {
    this.setState({ currency })
  }

  updateCurrencyCompare = (currencyProp) => {
    this.setState({ currencyCompare:currencyProp })
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
    const header = this.getAuthRequestOptions()
    let response = await fetch('/api/users/populate', header)
    response = await response.json()
    console.log(response)
    this.setState({ user:response }, () => this.updateFavorites())
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

  updateBitcoin = (data) => {
    this.setState( { bitcoin: data })
  }

  updateOneStock = (data) => {
    this.setState({ stock:data })
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
    const { user, articles, stocks, stock, favStocks } = this.state 
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
            <MainPage
              {...props}
              articles={articles}
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
