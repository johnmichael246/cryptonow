import React from 'react';
import {
    Row,
    Col,
    Preloader
} from 'react-materialize';
import {
    Link,
} from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Favs from '../../components/Favs/Favs';
import NavBar from '../../components/NavBar/NavBar';
import Watchlist from '../../components/Watchlist/Watchlist';
import Stock from '../../components/Stock/Stock';
import tokenService from '../../utilities/tokenService';
import './StocksPage.css';

class StocksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            currencyCompare:'',
        } 
    }

    
    searchParams = (e) => {
        this.setState({search:e.target.value})
        console.log(this.state.search)
    }
    currencyParams = (e) => {
        console.log(e.target.value)
        this.setState({currencyCompare:e.target.value})
    }

    populateUser = () => {
        let header=this.getAuthRequestOptions('GET');
        fetch('/api/users/populate', header)
        .then( response => response.json())
        .then( data => this.setState({user: data}))
    }

    getAuthRequestOptions=(method)=> {
    return {
        method: method,
        headers: new Headers({'Authorization':'Bearer '+ tokenService.getToken()}),
        }
    }

    getBitcoin = () => {
        fetch('/api/stocks/bitcoin')
        .then( response => response.json())
        .then( data => this.setState({bitcoin:data}))
    }
    getOneStock = () => {
        fetch(`/api/stocks/${this.props.match.params.id}`)
        .then( response => response.json())
        .then( data => this.setState({stock:data}))
    }
    
    componentDidMount() {
        fetch('/api/stocks')
        .then( response => response.json())
        .then( data => this.setState({stocks:data}))      
        this.populateUser();
        this.getOneStock();
        this.getBitcoin();
    }



    render() {
        return (
            <div className='stockpage-font'>
                <NavBar
                user={this.props.user}/>
                <Row>
                    <Col s={12}>
                        <Watchlist
                        articles={this.props.articles}
                        user={this.props.user}
                        currentStocks={this.state.currentStocks}
                        updateStockLink={this.props.updateStockLink} />
                    </Col>
                </Row>
                <Row>   
                    <Col s={12}>
                    {this.state.stock && this.state.bitcoin ?
                        <Stock
                        user={this.props.user}
                        stock={this.state.stock}
                        bitcoin={this.state.bitcoin}
                        currentStocks={this.state.currentStocks}
                        button={this.state.button}
                        addToWatchlist={this.props.addToWatchlist}
                        currency = {this.props.currency}
                        currencyParams={this.props.currencyParams}/> :
                        <div>
                            <Preloader size='big'/>
                            <p>Loading...</p>
                        </div>   
                    }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default StocksPage;