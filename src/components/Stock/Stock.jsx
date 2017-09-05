import React from 'react';
import './Stock.css';
import {
    Row,
    Col
} from 'react-materialize';


const Stock = (props) => {
    let bitcoinValue = props.stock[0].price_usd / props.bitcoin[0].price_usd
    let value = parseFloat(bitcoinValue.toFixed(5))
        return (
            <div>
                <Row>
                    <Col s={4}>
                        <h1>{props.stock[0].name}({props.stock[0].symbol})</h1>
                        <h5>rank:{props.stock[0].rank}</h5>
                    </Col>
                    <Col s={8}>
                        <h1>{props.stock[0].price_usd}&nbsp;&nbsp;&nbsp;<span style={ props.stock[0].price_usd > 0 ?{color:'green'} :{color:'red'} }>({props.stock[0].percent_change_24h}%)</span></h1>
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
                                <td>{props.stock[0].market_cap_usd.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{props.stock[0]['24h_volum_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{props.stock[0].available_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{props.stock[0].total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        )
}


export default Stock;