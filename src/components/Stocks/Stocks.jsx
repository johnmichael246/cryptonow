import React from 'react';
import './Stocks.css'
import {
    Table,
    Col,
    Preloader
} from 'react-materialize';
import {Link} from 'react-router-dom';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
    // class Filter extends React.Component {
    //     onChange(e) {
    //         this.props.onChange(e.target.value);
    //     }
    //     render() {
    //         return (
    //             <select onChange={this.onChange}>
    //                 <option value="">All</option>
    //                 <option value="market_cap_usd">Market Cap</option>
    //                 <option value="total_supply">Circulating Supply</option>
    //                 <option value="24h_volume_usd">Volume(24H)</option>
    //             </select>
    //         );
    //     }
    // }
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
            let customLinkComponent = ({value}) => <a href={`stocks/${value}`}>{value}</a>;
            let customDataMC = ({value}) => <div>{this.formatData(value)}</div>;
            let customColumn = ({value}) => <span style={ value > 0 ? {color:'green'} : {color:'red'} }>{value}%</span>;
            let styleConfig = {
                classNames: {
                    Row: 'row-class',
                    SettingsToggle: 'setting-class',
                    PreviousButton: 'btn',
                    NextButton: 'btn'
                },
                styles: {
                    Filter: { fontSize: 18 }
                }
            }
            var OtherPager = React.createClass({
                getDefaultProps: function() {
                    return{
                        "maxPage": 0,
                        "nextText": "",
                        "previousText": "",
                        "currentPage": 0,
                    }
                },
                pageChange: function(event) {
                    this.props.setPage(parseInt(event.target.getAttribute("data-value")));
                },
                render: function() {
                    var previous = "";
                    var next = "";

                    if(this.props.currentPage > 0) {
                        previous = <span onClick={this.props.previous} className="previous"><i className="glyphicon glyphicon-arrow-left"></i>{this.props.previousText}</span>
                    }

                    if(this.props.currentPage != (this.props.maxPage -1) ) {
                        next = <span onClick={this.props.next} className="next">{this.props.nextText}<i className="glyphicon glyphicon-arrow-right"></i></span>
                    }
                    var options = [];
                    var startIndex = Math.max(this.props.currentPage - 5, 0);
                    var endIndex = Math.min(startIndex + 11, this.props.maxPage);

                    if (this.props.maxPage >= 11 && (endIndex - startIndex) <= 10) {
                        startIndex = endIndex - 11;
                    }

                    for(var i = startIndex; i < endIndex ; i++) {
                        var selected = this.props.currentPage == i ? "current-page-selected" : "";
                            options.push(<button className={selected} data-value={i} onClick={this.pageChange}>{i + 1}</button>);
                    }

                    return (
                        <div>
                            <div>{previous}</div>
                            <div>{options}</div>
                            <div>{next}</div>
                        </div>
                    )
                }
            });
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
                plugins={[plugins.LocalPlugin]}
                styleConfig={styleConfig}
                useCustomPagerComponent="true"
                customPagerComponent={OtherPager}>
                    <RowDefinition>
                        <ColumnDefinition id='name' title='Name'/>
                        <ColumnDefinition id='id' title='ID' customComponent={customLinkComponent}/>
                        <ColumnDefinition id='symbol' title='Symbol'/>
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