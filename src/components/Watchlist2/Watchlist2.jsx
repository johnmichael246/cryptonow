import React from 'react';
import './Watchlist2.css';
import {
    Row,
    Col,
    Table,
    Preloader
} from 'react-materialize';
import {Link} from 'react-router-dom'

const test = (str) => {
    str('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Watchlist2 = (props) => {

    let favorites = props.favStocks ?
    <div>
            <Row>
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
                            {props.favStocks.map( (stock, index)=> {
                                return (
                                    <tr key="index">
                                        <td>{stock.name}</td>
                                        <td>{stock.symbol}</td>
                                        <td>{test(stock.market_cap_usd)}</td>
                                        <td>{stock.total_supply}</td>
                                        <td>{stock['24h_volume_usd']}</td>
                                        <td>style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                        <td>style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                        <td>style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    </tr>
                                )
                            })};
                    </tbody>
                </Table>
            </Row> 
        </div> :
        <div>
            <Preloader />
        </div>

    return ( {favorites} )
}

export default Watchlist2;