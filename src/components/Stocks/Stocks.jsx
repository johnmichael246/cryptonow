import React from 'react';
import './Stocks.css'
import {
    Table,
    Col,
    Preloader
} from 'react-materialize';
import {Link} from 'react-router-dom';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';


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
            let customLinkComponent = ({value}) => <a href={`stocks/${value}`} style={ { color:'black'} }>{value}</a>;
            let customDataMC = ({value}) => <span>{this.formatData(value)}</span>;
            let customColumn = ({value}) => <span style={ value > 0 ? {color:'green'} : {color:'red'} }>{value}%</span>;
            let customSymbolColumn = ({value}) => <span style={ {fontWeight:'bold'} }>{value}</span>;
            let styleConfig = {
                classNames: {
                    Row: 'row-class',
                    SettingsToggle: 'setting-class',
                    PreviousButton: 'btn',
                    NextButton: 'btn',
                    TableBody: 'table-body',
                },
                styles: {
                    Filter: {
                        fontSize: 18,
                        maxWidth:'50%',
                        placeHolder:'Filter Stocks'
                    }   
                }
            }
            let stocks = this.props.stocks ?
            <div>
                {/*<Table
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
                </Table>*/}
                <Griddle
                data={this.props.stocks}
                styleConfig={styleConfig}
                plugins={[plugins.LocalPlugin]}>
                    <RowDefinition>
                        {/*<ColumnDefinition id='name' title='Name'/>*/}
                        <ColumnDefinition id='id' title='Name' customComponent={customLinkComponent}/>
                        <ColumnDefinition id='symbol' title='Symbol' customComponent={customSymbolColumn}/>
                        <ColumnDefinition id='market_cap_usd' title='Market Cap'customComponent={customDataMC}/>
                        <ColumnDefinition id='total_supply' title='Circulating Supply' customComponent={customDataMC}/>
                        <ColumnDefinition id='24h_volume_usd' title='Volume(24H)' customComponent={customDataMC}/>
                        <ColumnDefinition id='percent_change_1h' title='Percent Change 1H'customComponent={customColumn}/>
                        <ColumnDefinition id='percent_change_24h' title='Percent Change 24H' customComponent={customColumn}/>
                        <ColumnDefinition id='percent_change_7d' title='Percent Change 7D' customComponent={customColumn}/>
                    </RowDefinition>
                </Griddle>
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


export default {
    Stocks
};