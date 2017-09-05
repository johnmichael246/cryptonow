import React from 'react';
import './StocksPage.css';
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
import FavArticles from '../../components/FavArticles/FavArticles';
import Stock from '../../components/Stock/Stock';
import Article from '../../components/Article/Article';


class StocksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            search:'',
            currencyCompare:'',
            stock:null,
            bitcoin:null,
            bitcoinValue:null
        } 
    }
    getOneStock = () => {
        fetch(`/api/stocks/${this.props.match.params.id}`)
        .then( response => response.json())
        .then( data => this.setState({stock:data}))
    }
    
    searchParams = (e) => {
        this.setState({search:e.target.value})
        console.log(this.state.search)
    }
    currencyParams = (e) => {
        console.log(e.target.value)
        this.setState({currencyCompare:e.target.value})
        console.log(this.state.currencyCompare)
    }

    getBitcoin = () => {
        fetch('/api/stocks/bitcoin')
        .then( response => response.json())
        .then( data => this.setState({bitcoin:data}))
    }

    componentDidMount() {
        this.getOneStock();
        this.getBitcoin();
    }

    render() {
        return (
            <div>
                <NavBar
                user={this.props.user} />
                <Row>
                    <Col s={6}>
                        <FavArticles
                        articles={this.props.articles}
                        user={this.props.user} />
                    </Col>
                    <Col s={6}>
                        <Watchlist
                        articles={this.props.articles}
                        user={this.props.user} />
                    </Col>
                </Row>
                <Row>   
                    <Col s={12}>
                        <Article
                        user={this.props.user} />
                    </Col>
                    <Col s={12}>
                    {this.state.stock && this.state.bitcoin ?
                        <Stock
                        user={this.props.user}
                        stock={this.state.stock}
                        bitcoin={this.state.bitcoin} /> :
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