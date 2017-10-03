import React from 'react';
import './Stock.css';
import tokenService from '../../utilities/tokenService';
import {
    Row,
    Col,
    Preloader,
    Input,
    Table
} from 'react-materialize';
import Graph from '../Graph/Graph';


class Stock extends React.Component {
    constructor(props) {
        super(props);
    }
    handleReturn = () => {
      this.props.history.goBack();
    }
    findfloatParseInt = (int) => {
        if ( int.toString().length > 1  ) {
            console.log('int is greater than 0, length is', int.toString().length)
            var arr = int.toString().split('.')[1].split('').map(Number);
            for(var i=0; i<arr.length; i++) {
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
        let button  
        if (!this.props.user) {
            button = '';
        } else if (this.props.stock && this.props.user.favStocks) {
            this.props.user.favStocks.find( s => s.apiId === this.props.stock[0].id) ?
                button = <button className='btn' type='submit' onClick={()=>this.props.addToWatchlist(this.props.stock[0].id, this.props.stock[0].symbol, this.props.stock[0].name)}>Remove from Watchlist</button> :
                button = <button className='btn' type='submit' onClick={()=>this.props.addToWatchlist(this.props.stock[0].id, this.props.stock[0].symbol, this.props.stock[0].name)}>Add to Watchlist</button>;
        }
        var bitcoinValue = 0
        var marketValue = ''
        var bitcoinMV= ''
        var bitcoinVol24 = ''
        if (this.props.bitcoin && this.props.stock) {
            bitcoinValue = this.props.stock[0].price_usd / this.props.bitcoin[0].price_usd
            marketValue = this.props.stock[0].market_cap_usd.split('.')[0]
            bitcoinMV= (marketValue/this.props.bitcoin[0].price_usd)
            bitcoinVol24 = Math.round(this.props.stock[0]['24h_volume_usd'].split('.')[0] / this.props.bitcoin[0].price_usd)
        }
        var coinValue
        var coinCap
        if(this.props.currency & this.props.stock) {
            coinValue = this.props.stock[0].market_cap_`${this.props.currency}`
            coinCap = this.props.stock[0]['24h_volume_rub']
        } else {
            coinValue='select a currency to compare'
            coinCap=0;
        }
        let graph=''
        if(this.props.stockVisualData) {
            graph = <Graph
            stockVisualData={this.props.stockVisualData}
            stock={this.props.stock}
            bitcoin={this.props.bitcoin}/>
        } 
        let oneStock = this.props.stock ? 
                <div>   
                    <Row >
                        <Col s={12} m={6}>
                            <h2 className='center-text'>{this.props.stock[0].name}({this.props.stock[0].symbol})</h2>
                            <h5><span><i className="material-icons">stars</i></span>rank:{this.props.stock[0].rank}</h5>
                            <div className='center-text'>
                                {button}<br/><br/>
                                <button className='btn'onClick={this.handleReturn}>BACK</button>                  
                            </div>
                        </Col>
                        <Col s={12} m={6}>
                            <h2 className='center-text'>${this.props.stock[0].price_usd}&nbsp;&nbsp;&nbsp;</h2>
                            <h2 className='center-text' style={this.props.stock[0].percent_change_24h > 0 ? {color:'green'} : {color:'red'} }> ({this.props.stock[0].percent_change_24h}%)</h2> 
                            <h6 className='center-text'>{bitcoinValue.toFixed(this.findfloatParseInt(bitcoinValue))}&nbsp;bitcoin</h6>
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
                                            <Input type='select' className='margin-top'label="Convert To" onChange={this.props.currencyParams} name='currencyParams' defaultValue='usd'>
                                                <option value='usd'>USD</option>
                                                <option value='eu'>EU</option>
                                                <option value='aud'>AUD</option>
                                                <option value='brl'>BRL</option>
                                                <option value='cad'>CAD</option>
                                                <option value='clp'>CLP</option>
                                                <option value='rub'>RUB</option>
                                            </Input>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={this.props.stock[0].id}>
                                        <td className ='remove-lower-padding'>{marketValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td className ='remove-lower-padding'>{this.props.stock[0]['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td className='centered'>{this.props.stock[0].available_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td key={0}className='centered'>{this.props.stock[0].total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        </tr>
                                    <tr>
                                        <td style ={{color:'grey'}} >{ Math.round(bitcoinMV)} <b>BTC</b></td>
                                        <td style ={{color:'grey'}} >{bitcoinVol24} <b>BTC</b></td>
                                    </tr>
                                    <tr>
                                        <td>{coinValue}</td>
                                        <td>{coinCap}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col s={12} m={6}>
                            {graph}                                                        
                        </Col>
                    </Row> 
                </div> :
                <div>
                    <Preloader size='big'/>
                    <p>Loading...</p>
                </div>   
            return oneStock;    
    }               
}


export default Stock;