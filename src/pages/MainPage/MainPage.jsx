import React from 'react';
import './MainPage.css';
import {
    Row,
    Col
} from 'react-materialize';
import SearchBar from '../../components/SearchBar/SearchBar';
import Favs from '../../components/Favs/Favs';
import News from '../../components/News/News';
import StockShow from '../../components/StockShow/StockShow';
import FavArticles from '../../components/FavArticles/FavArticles';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            search:'',
            currencyCompare:'',
            // stocks:null
        } 
    }
    searchStocks = () => {
        let stockURL ='';
        if(this.state.search) {
             stockURL = 'https://min-api.cryptocompare.com/data/pricehistorical'
        } else {
             stockURL = 'https://www.cryptocompare.com/api/data/coinlist/'
        }
        let currency = this.state.currencyCompare;

        fetch(`${stockURL}&fysm=USD&tsyms${currency}`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then( response => response.json())
        // .then( data => this.setState({stocks}))
        .then( data => console.log(data))
    }
    
    searchParams = (e) => {
        console.log(e.target.value)
        this.setState({search:e.target.value})
        console.log(this.state.search)
    }
    currencyParams = (e) => {
        console.log(e.target.value)
        this.setState({currencyCompare:e.target.value})
        console.log(this.state.currencyCompare)
    }

    render() {
        let mainPage = this.props.user ?
        <div>
            <Row>
                <Col s={4}>
                    <News
                    user={this.props.user} />
                </Col>
                    
                <Col s={8}>
                    <SearchBar
                    searchStocks ={this.searchStocks}
                    search={this.state.search}
                    searchParams={this.searchParams}
                    currencyParams={this.currencyParams} />
                    <Favs
                    user={this.props.user} />
                    <StockShow
                    user={this.props.user} />
                </Col>
            </Row>
        </div> :
        <div>
            MainPage:User is logged out
        </div>
        return (

            <div>
                {mainPage}
            </div>
        )
    }
}


export default MainPage;