import React from 'react';
import './Stock.css';
import {
    Row,
    Col
} from 'react-materialize';


const Stock = (props) => {
    let bitcoinValue = props.stock[0].price_usd / props.bitcoin[0].price_usd
    let value = parseFloat(bitcoinValue.toFixed(5))
    let marketValue = props.stock[0].market_cap_usd.split('.')[0]
    let bitcoinMV= (marketValue/props.bitcoin[0].price_usd)
    let bitcoinVol24 = Math.round(props.stock[0]['24h_volume_usd'].split('.')[0] / props.bitcoin[0].price_usd)
    let button 

    if (props.currentStocks.favStocks === undefined) {
        button =  <button className='btn' type='submit' onClick={()=>props.addToWatchlist(props.stock[0].id, props.stock[0].symbol, props.stock[0].name)}> Get Info</button>
    } else {
        console.log('currentStocks', props.currentStocks)
        button = props.currentStocks.favStocks.filter( stock => stock.apiId === props.stock[0].id) ?
            <div>
                <button className='btn' type='submit' onClick={()=>props.addToWatchlist(props.stock[0].id, props.stock[0].symbol, props.stock[0].name)}> Remove From Watchlist</button>
            </div> :
            <div>
                <button className='btn' type='submit' onClick={()=>props.addToWatchlist(props.stock[0].id, props.stock[0].symbol, props.stock[0].name)}> Add to Watchlist</button>
            </div>
    }
                        
        return (
            <div>
                <Row>
                    <Col s={12} m={6} >
                        <h2>{props.stock[0].name}({props.stock[0].symbol})</h2>
                        <h5>rank:{props.stock[0].rank}</h5>
                    </Col>
                    <Col s={12}m={6}>
                        <h2>{props.stock[0].price_usd}&nbsp;&nbsp;&nbsp;<span style={ props.stock[0].price_usd > 0 ?{color:'green'} :{color:'red'} }>({props.stock[0].percent_change_24h}%)</span></h2>
                        <h6> {value} bitcoin</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <table>
                            <thead>
                                <tr>
                                    <th>Market Cap</th>
                                    <th>Volume(24hr)</th>
                                    <th>Supply Circulating</th>
                                    <th>Maximum Supply</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className ='remove-lower-padding '>{marketValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className ='remove-lower-padding '>{props.stock[0]['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className='centered'>{props.stock[0].available_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td key={0}className='centered'>{props.stock[0].total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                <tr>
                                    <td className='remove-margin centered' style ={{color:'grey'}} >{ Math.round(bitcoinMV)} <b>BTC</b></td>
                                    <td className='remove-margin centered' style ={{color:'grey'}} >{bitcoinVol24} <b>BTC</b></td>
                                </tr>
                            </tbody>
                        </table>
                        {button}
                    </Col>
                </Row>
            </div>
        )
}


export default Stock;