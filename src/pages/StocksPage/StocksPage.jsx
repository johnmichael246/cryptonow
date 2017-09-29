import React from 'react';
import {
    Row,
    Col,
    Preloader
} from 'react-materialize';
import {
    Link,
} from 'react-router-dom';
import Favs from '../../components/Favs/Favs';
import NavBar from '../../components/NavBar/NavBar';
import Watchlist from '../../components/Watchlist/Watchlist';
import Stock from '../../components/Stock/Stock';
import tokenService from '../../utilities/tokenService';
import Graph from '../../components/Graph/Graph';
import './StocksPage.css';

class StocksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyCompare: '',
            stockVisualData:[]
        } 
    }

    currencyParams = (e) => {
        this.setState({currencyCompare:e.target.value})
    }

    populateUser = () => {
        let header=this.getAuthRequestOptions('GET');
        fetch('/api/users/populate', header)
        .then( response => response.json())
        .then( data => this.setState({user: data}))
    }

    getBitcoin = () => {
        fetch('/api/stocks/bitcoin')
        .then( response => response.json())
        .then( data => this.props.updateBitcoin(data))
    }

    getStockGraphData = () => {
        console.log('im hitting over here!!')
        let id = this.props.stock[0].id
        fetch('/api/stockVisualizeData/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
        .then(res => res.json())
        .then( data => {
            console.log(data)
            this.setState({stockVisualData:data })
        })
    }

    getOneStockCurrency = (currency) => {
        let header = this.getAuthRequestOptions('POST');
        header.headers.append('Content-Type','application/json');
        header.body=JSON.stringify({currency:currency, id:this.state.stock[0].id})
        fetch(`/api/stocks/${this.state.stock[0].id}/${this.state.currency}`, header)
        .then( response => response.json())
        .then( data => this.setState({stock:data}))
    }

    getOneStock = () => {
        fetch(`/api/stocks/${this.props.match.params.id}`)
        .then( response => response.json())
        .then( data => {
            this.props.updateOneStock(data)
            this.getStockGraphData()
        })
    }

    setOneStockTimer = () => {
        console.log('starting one stock timer')
        setInterval(()=> {
            this.getOneStock()
        },120000)
    }
    clearOneStockTimer = () => {
        clearInterval(this.setOneStockTimer)
    }
    
    componentDidMount() {     
        // this.populateUser();
        this.getOneStock();
        this.getBitcoin();
        this.setOneStockTimer();
    }
    componentWillUnmount() {
        this.clearOneStockTimer()
        this.setState({stockVisualData:null})
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
                        <Stock
                            history={this.props.history}
                            user={this.props.user}
                            stock={this.props.stock}
                            bitcoin={this.props.bitcoin}
                            currentStocks={this.props.currentStocks}
                            addToWatchlist={this.props.addToWatchlist}
                            currency = {this.props.currency}
                            currencyParams={this.props.currencyParams}
                            stockVisualData={this.state.stockVisualData}/> 
                    </Col>
                </Row>
            </div>
        )
    }
}

export default StocksPage;