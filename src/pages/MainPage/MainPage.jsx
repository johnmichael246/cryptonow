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
            stocks:null
        } 
    }
    searchStocks = () => {
        fetch('/stocks/stocks').then( response => response.json())
        .then( data => this.setState({stocks:data.Data}))
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
        let mainPage = this.props.user ?
        <div>
            <Row>
                <Col s={4}>
                    <News
                    user={this.props.user} />
                </Col>
                    
                <Col s={8}>
                    <SearchBar
                    stocks={this.state.stocks}
                    search={this.state.search}
                    searchStocks ={this.searchStocks}
                    searchParams={this.searchParams}
                    currencyParams={this.currencyParams} />
                    <Favs
                    user={this.props.user} />
                    <StockShow
                    user={this.props.user}
                    stocks={this.state.stocks} />
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