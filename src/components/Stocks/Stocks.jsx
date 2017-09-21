import React from 'react';
import './Stocks.css'
import {
    Table,
    Col,
    Preloader
} from 'react-materialize';
import {
    Link
} from 'react-router-dom';
import ReactTable from 'react-table';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
    const Stocks = (props) => {

            let stockChart = props.stocks ?
            <div>
                <Table
                responsive={true}>
                    <thead>
                        <tr>
                            <th data-field="name">Name</th>
                            <th data-field="sym">Symbol</th>
                            <th data-field="mc">Market Cap</th>
                            <th data-field="supply">Circulating Supply</th>
                            <th data-field="volume24">Volume(24hr)</th>
                            <th data-field="prctChange">Percent Change</th>
                            <th data-field="prctChange">Percent Change 24h</th>
                            <th data-field="prctChange">Percent Change 7d</th>
                        </tr>
                    </thead>
                    <tbody className ='hide-mobile boomboom'>
                        {props.stocks.map( (stock, index) => {
                            return (
                                <tr>
                                    <Link to={`stocks/${stock.id}`} style={ {color:'black'} }>
                                        <td key={stock.name}>{stock.name.toUpperCase()}</td>
                                    </Link>
                                    <td><b>{stock.symbol}</b></td>
                                    <td>{stock.market_cap_usd.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{stock.total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{stock['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    <td style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_24h}&nbsp;%</td>
                                    <td style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_7d}&nbsp;%</td>
                                </tr>   
                            ) 
                        })}
                    </tbody>
                </Table>
                <Table  className='table hide-mobile boom'
                responsive={true}
                hoverable={true}
                bordered={true}>
                    <tbody>
                        {props.stocks.map( (stock, index) => {
                            return (
                                <tr>
                                    <Link to={`stocks/${stock.id}`} style={ {color:'black'} }>
                                        <td key={stock.name}>{stock.name.toUpperCase()}</td>
                                    </Link>
                                    <td><b>{stock.symbol}</b></td>
                                    <td>{stock.market_cap_usd.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{stock.total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{stock['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    <td style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_24h}&nbsp;%</td>
                                    <td style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_7d}&nbsp;%</td>
                                </tr>   
                            ) 
                        })}
                    </tbody>
                </Table>
            </div> :
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th data-field="name">Name</th>
                            <th data-field="sym">Symbol</th>
                            <th data-field="mc">Market Cap</th>
                            <th data-field="supply">Circulating Supply</th>
                            <th data-field="volume24">Volume(24hr)</th>
                            <th data-field="prctChange">Percent Change</th>
                        </tr>
                    </thead>
                </Table>
                <br/><br/>
                <Col s={12}>
                    <Preloader size='big'/>
                </Col>
            </div>
            return stockChart;
    }



export default Stocks;