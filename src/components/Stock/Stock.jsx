import React from 'react';
import './Stock.css';
import {
    Row,
    Col,
    Preloader,
    Input,
    Table
} from 'react-materialize';
import Graph from '../Graph/Graph';
const regExp = /\B(?=(\d{3})+(?!\d))/g

class Stock extends React.Component {
    handleReturn = () => {
      this.props.history.goBack();
    }

    formatNumber = (int) => {
        if(typeof int === 'string') {
            return int.replace(regExp, ",")
        } else if (typeof int === 'number') {
            let stringifiedNumber = int.toString()
            if (stringifiedNumber.match(/\./)) {
                stringifiedNumber = stringifiedNumber.split('.')
                stringifiedNumber[0] = stringifiedNumber[0].replace(regExp, ',')
                stringifiedNumber[1] = Number(stringifiedNumber[1])
                return stringifiedNumber.join('.')
            } else {
                return stringifiedNumber.replace(regExp, ",")
            }
        }
    }

    render() {
        const { user, stock, bitcoin, currency } = this.props
        let button
        let bitcoinValue = 0
        let marketValue = 0
        let bitcoinMV= 0
        let bitcoinVol24 = 0
        let graph=''
        if (stock && user) {
            button = <button className='btn' type='submit' onClick={()=>this.props.addToWatchlist(stock[0].id, stock[0].symbol, stock[0].name)}>{user.favStocks.find( s => Number(s.apiId) === stock[0].id) ? 'Remove From Watchlist': 'Add to Watchlist'}</button>
        }
        if (bitcoin && stock) {
            // bitcoinValue = stock[0].quotes[currency].price / bitcoin[0].quotes[currency].price
            marketValue = stock[0].market_cap
            bitcoinMV= (marketValue/bitcoin[0].price)
            // bitcoinVol24 = Math.round(stock[0].quotes[currency].volume_24h / bitcoin[0].quotes[currency].volume_24h)
        }
        if(this.props.stockVisualData.length > 0) {
            graph = <Graph
            stockVisualData={this.props.stockVisualData}
            stock={stock}
            bitcoin={bitcoin}/>
        } 
        let singleStockInfo = stock && bitcoin ? 
            <div>   
                <Row >
                    <Col s={12} m={6}>
                        <h2 className='center-text'>{stock[0].name}({stock[0].symbol})</h2>
                        <h5><span><i className="material-icons">stars</i></span>rank:{stock[0].rank}</h5>
                        <div className='center-text'>
                            {button}<br/><br/>
                            <button className='btn'onClick={this.handleReturn}>BACK</button>                  
                        </div>
                    </Col>
                    <Col s={12} m={6}>
                        <h2 className='center-text'>{this.formatNumber(stock[0].quotes[currency].price)}&nbsp;{currency}&nbsp;&nbsp;</h2>
                        <h2 className='center-text' style={stock[0].percent_change_24h > 0 ? {color:'green'} : {color:'red'} }> ({stock[0].percent_change_24h}%)</h2> 
                        <h6 className='center-text'>{bitcoinValue}&nbsp;bitcoin</h6>
                    </Col>
                </Row>
                <Row>
                    <Col s={12} m={6}>
                        <Table responsive={true} centered={true}>
                            <thead>
                                <tr>
                                    <th>Market Cap</th>
                                    <th>Volume(24hr)</th>
                                    <th>Supply Circulating</th>
                                    <th>Maximum Supply</th>
                                    <th>
                                        <Input type='select' className='margin-top'label="Convert To" onChange={this.props.currencyParams} name='currencyParams' defaultValue='USD'>
                                            <option value='USD'>USD</option>
                                            <option value='EUR'>EUR</option>
                                            <option value='AUD'>AUD</option>
                                            <option value='BRL'>BRL</option>
                                            <option value='CAD'>CAD</option>
                                            <option value='CLP'>CLP</option>
                                            <option value='RUB'>RUB</option>
                                            <option value='CHF'>CHF</option>
                                            <option value='JPY'>JPY</option>
                                            <option value='CZK'>CZK</option>
                                            <option value='DKK'>DKK</option>
                                            <option value='GBP'>GBP</option>
                                            <option value='PHP'>PHP</option>
                                            <option value='SEK'>SEK</option>
                                            <option value='PKR'>PKR</option>
                                            <option value='JPY'>JPY</option>
                                            <option value='CZK'>CZK</option>
                                            <option value='DKK'>DKK</option>
                                            <option value='MXN'>MXN</option>
                                            <option value='ZAR'>ZAR</option>
                                            <option value='IDR'>IDR</option>
                                        </Input>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className ='remove-lower-padding'>{this.formatNumber(marketValue)}</td>
                                    <td className ='remove-lower-padding'>{stock[0].quotes[currency].volume_24h.toString().split('.')[0]}</td>
                                    <td className='centered'>{stock[0].circulating_supply.toString().split('.')[0]}</td>
                                    <td key={0}className='centered'>{stock[0].circulating_supply.toString().split('.')[0]}</td>
                                    </tr>
                                <tr>
                                    <td style ={{color:'grey'}} >{ Math.round(bitcoinMV)} <b>BTC</b></td>
                                    <td style ={{color:'grey'}} >{bitcoinVol24} <b>BTC</b></td>
                                </tr>
                                <tr>
                                    <td>{this.props.stock[0][this.props.volume24Compare]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col s={12} m={6}>
                        {graph}                                                        
                    </Col>
                </Row> 
            </div> : (
            <Col s={12} className='center-preloader'>
                <Preloader 
                size='big'
                flashing
                className='center-preloader'/>
                <p>Loading...</p>
            </Col>
            )   
        return singleStockInfo    
    }               
}

export default Stock
