import React from 'react';
import './Stocks.css'
import {
    Table,
    Row,
    Col
} from 'react-materialize'
const Stocks = (props) => {

    let stockChart =(props.stocks) ?

    <div>
        <Table
        responsive={true}
        hoverable={true}>
            <thead>
                <tr>
                    <th data-field="id">Name</th>
                    <th data-field="name">Symbol</th>
                    <th data-field="price">Market Cap</th>
                    <th data-field="price">Circulating Supply</th>
                    <th data-field="price">Volume(24hr)</th>
                    <th data-field="price">Percent Change</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.stocks).map(function(stock, index) {
                    return (
                <tr>
                    <td value={index}> {stock.Id} </td>
                    <td value={index}> {stock.CoinName} </td>
                    <td value={index}> {stock.TotlCoinSupply} </td>
                    <td value={index}> {stock.Alogrithim} </td>
                    <td value={index}> {stock.Name} </td>
                    <td value={index}> {stock.Name} </td>
                </tr>

                    )
                })};

            </tbody>
        </Table>
         {console.log(props.stocks)}

    </div> :
    <div>
        <Table>
            <thead>
                <tr>
                    <th data-field="id">Name</th>
                    <th data-field="name">Symbol</th>
                    <th data-field="price">Market Cap</th>
                    <th data-field="price">Circulating Supply</th>
                    <th data-field="price">Volume(24hr)</th>
                    <th data-field="price">Percent Change</th>
                </tr>
            </thead>
            <tbody>
                Loading...
            </tbody>
        </Table>
    </div>
    return (
        <div>
            {stockChart}
        </div>
    )


}


export default Stocks;