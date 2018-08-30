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


class Stock extends React.Component {

    handleReturn = () => {
      this.props.history.goBack();
    }

    findfloatParseInt = (int) => {
        if (!int) return
        console.log('bbbbbbbbbb',int)
        if ( int.toString().length > 1  ) {
            let arr = int.toString().split('.')[1].split('').map(Number);
            for(let i=0; i<arr.length; i++) {
                if (arr[i] !== 0){
                    let num = i + 2;
                    return num
                }
            }
        } else {
            return int
        }
    }

    render() {
        const { user, stock, bitcoin, currency } = this.props
        let button = ''
        if (stock && user) {
            button = <button className='btn' type='submit' onClick={()=>this.props.addToWatchlist(stock[0].id, stock[0].symbol, stock[0].name)}>{user.favStocks.find( s => Number(s.apiId) === stock[0].id) ? 'Remove From Watchlist': 'Add to Watchlist'}</button>
        }
        let bitcoinValue = 0
        let marketValue = ''
        let bitcoinMV= ''
        let bitcoinVol24 = ''
        if (bitcoin && stock) {
            currencyCompareValue = Math.round(stock[0].quotes[currency.toUpperCase()].price * 100) / 100
            bitcoinValue = stock[0].price_usd / bitcoin[0].price_usd
            marketValue = stock[0].market_cap
            bitcoinMV= (marketValue/bitcoin[0].price)
            bitcoinVol24 = Math.round(stock[0].quotes[currency.toUpperCase()].volume_24h / bitcoin[0].quotes[currency.toUpperCase()].volume_24h)
        }
        let graph=''
        if(this.props.stockVisualData.length > 0) {
            graph = <Graph
            stockVisualData={this.props.stockVisualData}
            stock={stock}
            bitcoin={bitcoin}/>
        } 
        let oneStock = stock && bitcoin ? 
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
                        <h2 className='center-text'>{(Math.round(stock[0].quotes[this.props.currencyCompare.toUpperCase()].price * 100)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;{this.props.currency.toUpperCase()}&nbsp;&nbsp;</h2>
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
                                    <td className ='remove-lower-padding'>{marketValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className ='remove-lower-padding'>{stock[0].quotes[currency.toUpperCase()].volume_24h.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className='centered'>{stock[0].circulating_supply.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td key={0}className='centered'>{stock[0].circulating_supply.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
        return oneStock;    
    }               
}


export default Stock;