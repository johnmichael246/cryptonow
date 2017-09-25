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
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


    class Stocks extends React.Component {
        constructor(props) {
            super(props);
        }
        componentWillMount() {
            this.props.searchStocks();
            this.props.setTimer();
        }
        componentWillUnmount() {
            this.props.clearTimer();
        }
        formatData = (str) => {
            if (str === null || str === undefined) return;
            return str.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        render() {

            let stocks = this.props.stocks ?
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
                        {this.props.stocks.map( (stock, index) => {
                            return (
                                <tr key={index}>
                                    <Link to={`stocks/${stock.id}`} style={ {color:'black'} }>
                                        <td key={stock.name}>{stock.name.toUpperCase()}</td>
                                    </Link>
                                    <td key={stock.symbol}><b>{stock.symbol}</b></td>
                                    <td key={stock.market_cap_usd}>{this.formatData(stock.market_cap_usd)}</td>
                                    <td key={stock.total_supply}>{this.formatData(stock.total_supply)}</td>
                                    <td key={stock['24h_volume_usd']}>{this.formatData(stock['24h_volume_usd'])}</td>
                                    <td key ={stock.percent_change_1h} style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    <td key ={stock.percent_change_24h} style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_24h}&nbsp;%</td>
                                    <td key={stock.percent_change_7d} style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_7d}&nbsp;%</td>
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
                        {this.props.stocks.map( (stock, index) => {
                            return (
                                <tr key={index}>
                                    <Link to={`stocks/${stock.id}`} style={ {color:'black'} }>
                                        <td key={stock.name}>{stock.name.toUpperCase()}</td>
                                    </Link>
                                    <td key={stock.symbol}><b>{stock.symbol}</b></td>
                                    <td key={stock.market_cap_usd}>{this.formatData(stock.market_cap_usd)}</td>
                                    <td key={stock.total_supply}>{this.formatData(stock.total_supply)}</td>
                                    <td key={stock['24h_volume_usd']}>{this.formatData(stock['24h_volume_usd'])}</td>
                                    <td key ={stock.percent_change_1h} style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    <td key ={stock.percent_change_24h} style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_24h}&nbsp;%</td>
                                    <td key={stock.percent_change_7d} style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_7d}&nbsp;%</td>
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
                <br/>
                <Col s={12}>
                    <Preloader size='big'/>
                </Col>
            </div>
            return stocks;
        }
    }


export default Stocks;