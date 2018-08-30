import React from 'react';
import {
    Row,
    Col
} from 'react-materialize';
import Watchlist from '../../components/Watchlist/Watchlist';
import Stock from '../../components/Stock/Stock';
import './StocksPage.css';

class StocksPage extends React.Component {
    state = {
        stockVisualData:[]
    }

    getBitcoinValue = async () => {
        let response = await fetch('/api/stocks/1')
        response = await response.json()
        this.props.updateBitcoin(response)
    }

    getStockGraphData = async () => {
        let id = this.props.stock[0].id
        let response = await fetch('/api/stockVisualizeData/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ id })
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
    }

    currencyParams = (e) => {
        let value = e.target.value
        this.getOneStockCurrency(value)
    }

    setOneStockTimer = () => {
        setInterval(()=> {
            this.getOneStockCurrency(this.props.currency)
            this.getBitcoinValue()
        },120000)
    }
    
    clearOneStockTimer = () => {
        clearInterval(this.setOneStockTimer)
    }
    
    componentDidMount() {     
        this.getOneStockCurrency(this.props.currency)
        this.setOneStockTimer()
        this.getBitcoinValue()
    }
    componentWillUnmount() {
        this.clearOneStockTimer()
        this.setState({ stockVisualData:null })
    }


    render() {
        const { articles, stock, user, bitcoin } = this.props
        return (
            <div className='stockpage-font'>
                <Row>
                    <Col s={12}>
                        <Watchlist
                        articles={articles}
                        user={user}
                        stock={stock} />
                    </Col>
                </Row>
                <Row>   
                    <Col s={12}>
                        <Stock
                        history={this.props.history}
                        user={user}
                        stock={stock}
                        bitcoin={bitcoin}
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