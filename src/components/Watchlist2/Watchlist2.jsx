import React from 'react';
import './Watchlist2.css';
import {
    Row,
    Col,
    Table
} from 'react-materialize';
import {Link} from 'react-router-dom';


const Watchlist2 = (props) => {
    return (
        <div>
            <Row>
                <Col s={8}>
                <Table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Symbol</td>
                            <td>Market Cap</td>
                            <td>Circulating Supply</td>
                            <td>Volume(24hr)</td>
                            <td>Percent Change 1hr</td>
                            <td>Percent Change 24hr</td>
                            <td>Percent Change 7 Days</td>
                        </tr>
                    </thead>
                    <tbody>
                            {props.favStocks.map( (stock, index) => {
                                return (
                                    <tr key={index}>
                                        <td key={stock.name}>{stock.name}</td>
                                        <td key={stock.symbol}>{stock.symbol}</td>
                                        <td key={stock.market_cap_usd}>{stock.market_cap_usd}</td>
                                        <td key={stock.total_supply}>{stock.total_supply}</td>
                                        <td key={stock['24h_volume_usd']}>{stock['24h_volume_usd']}</td>
                                        <td key={stock.percent_change_1h} style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                        <td key={stock.percent_change_24h} style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} } >{stock.percent_change_1h}&nbsp;%</td>
                                        <td key={stock.percent_change_7d} style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
                </Col>
            </Row> 
        </div> 
    )
}

export default Watchlist2;