import React from 'react';
import './Stocks.css'
import {
    Table,
    Row,
    Col
} from 'react-materialize'
const Stocks = () => {
        return (
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

                </tbody>
            </Table>
        )
}

export default Stocks;