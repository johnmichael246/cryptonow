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

            let stockChart =(props.stocks) ?
            <div>
                {/*<BootstrapTable data={stocks} striped hover>
                    <TableHeaderColumn isKey dataField='name'> Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='symbol'>Product Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='price_usd'>price_usd</TableHeaderColumn>
                    <TableHeaderColumn dataField='24h_volume_usd'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='market_cap_usd'>Market Cap</TableHeaderColumn>
                    <TableHeaderColumn dataField='available_supply'>Available Supply</TableHeaderColumn>
                    <TableHeaderColumn dataField='total_supply'>Total Supply</TableHeaderColumn>
                    <TableHeaderColumn dataField='percent_change_1h'>Percent Change 1H</TableHeaderColumn>
                    <TableHeaderColumn dataField='percent_change_24h'>Percent Change 24H</TableHeaderColumn>
                    <TableHeaderColumn dataField='percent_change_7d'>Percent Change 7D</TableHeaderColumn>
                </BootstrapTable>*/}
                <Table
                responsive={true}
                hoverable={true}>
                    <thead>
                        <tr>
                            <th className='center'data-field="name">Name</th>
                            <th data-field="sym">Symbol</th>
                            <th data-field="mc">Market Cap</th>
                            <th data-field="supply">Circulating Supply</th>
                            <th data-field="volume24">Volume(24hr)</th>
                            <th data-field="prctChange">Percent Change</th>
                            <th data-field="prctChange">Percent Change 24h</th>
                            <th data-field="prctChange">Percent Change 7d</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.stocks.map( (stock, index) => {
                            return (
                                <tr>
                                    <Link to={`stocks/${stock.id}`} style={ {color:'black'} }>
                                        <td>{stock.name.toUpperCase()}</td>
                                    </Link>
                                    <td><b>{stock.symbol}</b></td>
                                    <td>{stock.market_cap_usd.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{stock.total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{stock['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className='center'style={ stock.percent_change_1h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_1h}&nbsp;%</td>
                                    <td className='center'style={ stock.percent_change_24h > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_24h}&nbsp;%</td>
                                    <td className='center'style={ stock.percent_change_7d > 0 ? {color:'green'} : {color:'red'} }>{stock.percent_change_7d}&nbsp;%</td>
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