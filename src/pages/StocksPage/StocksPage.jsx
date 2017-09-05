import React from 'react';
import './StocksPage.css';
import {
    Row,
    Col
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


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            search:'',
            currencyCompare:'',
            stocks:null
        } 
    }
    searchStocks = () => {
        fetch('/stocks/stocks').then( response => response.json())
        .then( data => this.setState({stocks:data}))
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

    componentDidMount() {
        this.searchStocks();
    }

    render() {
        return (
            <div>
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
                        <Stock
                        user={this.props.user} />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default MainPage;