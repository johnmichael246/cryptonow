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
import Watchlist from '../../components/Watchlist/Watchlist';
import Stock from '../../components/Stock/Stock';
import tokenService from '../../utilities/tokenService';
import Graph from '../../components/Graph/Graph';
import './StocksPage.css';

class StocksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockVisualData:[]
        } 
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

    getOneStock = () => {
        console.log(this.props.match.params.id)
        fetch(`/api/stocks/${this.props.match.params.id}`)
        .then( response => response.json())
        .then( data => {
            this.props.updateOneStock(data)
            this.getStockGraphData()
        })
    }
    getOneStockCurrency = (currency) => {
        fetch(`/api/stocks/${this.props.match.params.id}/currency/${this.props.currency}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:{
                currency:this.props.currency,
                id:this.props.match.params.id
            }
        })
        .then( response => response.json()) 
        .then( data => {
            console.log(data)
            this.props.updateOneStock(data)
            this.getStockGraphData()
            this.filterCurrency(this.props.stock[0])
            this.filterCurrencyVolume(this.props.stock[0])
        })
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
        let filterNum = Object.keys(object)
        console.log(filterNum)
        let lowerCurrency = this.props.currency.toLowerCase();
        let filteredNums = filterNum.filter(key=> key.includes(`price_${lowerCurrency}`))
        let newObj = filteredNums.reduce( (obj, key)=> {
            obj[key] =filterNum[filteredNums]
        })
        this.props.updateCurrencyCompare(newObj)
    }
    filterCurrencyVolume = (object) => {
        let filterNum = Object.keys(object)
        console.log(filterNum)
        let lowerCurrency = this.props.currency.toLowerCase();
        console.log(lowerCurrency)
        if(filterNum.filter(key => !key.includes(`24_volume_${lowerCurrency}`))) return;
        let filteredNums = filterNum.filter(key=> key.includes(`24_volume_${lowerCurrency}`))
        console.log(filteredNums)
        let newObj = filteredNums.reduce( (obj, key)=> {
            obj[key] =filterNum[filteredNums]
        })
        this.props.updateVolume24Compare(newObj)
    }
    
    componentDidMount() {     
        // this.populateUser();
        this.getOneStockCurrency();
        this.setOneStockTimer();
        this.getBitcoin();
    }
    componentWillUnmount() {
        this.clearOneStockTimer()
        this.setState({stockVisualData:null})
    }


    render() {
        return (
            <div className='stockpage-font'>
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