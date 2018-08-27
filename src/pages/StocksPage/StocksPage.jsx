import React from 'react';
import {
    Row,
    Col
} from 'react-materialize';
import {
    Link,
} from 'react-router-dom';
import Favs from '../../components/Favs/Favs';
import Watchlist from '../../components/Watchlist/Watchlist';
import Stock from '../../components/Stock/Stock';
import tokenService from '../../utilities/tokenService';
import Graph from '../../components/Graph/Graph';
import './StocksPage.css';

class StocksPage extends React.Component {
    state = {
        stockVisualData:[]
    }

    getBitcoin = async () => {
        let response = await fetch('/api/stocks/1')
        response = await response.json()
        this.props.updateBitcoin()
    }

    getStockGraphData = async () => {
        let id = this.props.stock[0].id
        let response = await fetch('/api/stockVisualizeData/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ id:id })
        })
        response = await response.json()
        this.setState({ stockVisualData: response })
    }

    getOneStock = async () => {
        let response = await fetch(`/api/stocks/${this.props.match.params.id}`)
        response = await response.json()
        this.props.updateOneStock(response)
        this.getStockGraphData()
    }

    getOneStockCurrency = async (currency) => {
        let response = await fetch(`/api/stocks/${this.props.match.params.id}/currency/${currency}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        response = await response.json() 

        this.props.updateOneStock(response)
        this.getStockGraphData()
        this.filterCurrency(this.props.stock[0])
        this.filterCurrencyVolume(this.props.stock[0])
    }

    currencyParams = (e) => {
        this.props.updateCurrency(e.target.value);
        this.getOneStockCurrency(e.target.value)
    }

    setOneStockTimer = () => {
        setInterval(()=> {
            this.getOneStockCurrency()
        },120000)
    }
    
    clearOneStockTimer = () => {
        clearInterval(this.setOneStockTimer)
    }

    filterCurrency = (object) => {
        let quotedCurrency = Object.keys(object.quotes)
        this.props.updateCurrencyCompare(quotedCurrency)
    }

    filterCurrencyVolume = (object) => {
        let quotedCurrencyVolume = Object.keys(object.volume_24h)
        this.props.updateVolume24Compare(quotedCurrencyVolume)
    }
    
    componentDidMount() {     
        this.getOneStockCurrency(this.props.currency)
        this.setOneStockTimer()
        this.getBitcoin()
    }
    componentWillUnmount() {
        this.clearOneStockTimer()
        this.setState({ stockVisualData:null })
    }


    render() {
        console.log('=====',this.props.stock)
        return (
            <div className='stockpage-font'>
                <Row>
                    <Col s={12}>
                        <Watchlist
                        articles={this.props.articles}
                        user={this.props.user}
                        updateStockLink={this.props.updateStockLink}
                        stock={this.props.stock} />
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
                            currencyParams={this.currencyParams}
                            stockVisualData={this.state.stockVisualData}
                            getOneStockCurrency={this.props.getOneStockCurrency}
                            currencyCompare={this.props.currencyCompare}
                            volume24Compare={this.props.volume24Compare}/> 
                    </Col>
                </Row>
            </div>
        )
    }
}

export default StocksPage;