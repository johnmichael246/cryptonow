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
                                <th>Market Cap</th>
                                <th>Volume(24hr)</th>
                                <th>Supply Circulating</th>
                                <th>Maximum Supply</th>
                            </thead>
                            <tbody>
                                <td>{marketValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br/>{ Math.round(bitcoinMV) } </td>
                                <td>{props.stock[0]['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{props.stock[0].available_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td key={0}>{props.stock[0].total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            </tbody>
                        </table>
                            <button className='btn' type='submit' onClick={()=>props.addToWatchlist(props.stock[0].id)}> Add to Watchlist</button>
                    </Col>
                </Row>
            </div>
        )
}


export default Stock;