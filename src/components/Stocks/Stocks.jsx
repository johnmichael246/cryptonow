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
    class Stocks extends React.Component {
        constructor(props) {
            super(props);
        this.state= {
            stocks:[]
        }
        }

        changePercent=() => {
            alert('the stock index is now', )
        }
        // componentDidMount() {
        //     this.setState({stocks:stockVolChange})
        // }

        render() {
            let stockVolChange=[];
            let stockChart =(this.props.stocks) ?
            <div>
                <Table
                responsive={true}
                hoverable={true}>
                    <thead>
                        <tr>
                            <th  className='center'data-field="name">Name</th>
                            <th data-field="sym">Symbol</th>
                            <th data-field="mc">Market Cap</th>
                            <th data-field="supply">Circulating Supply</th>
                            <th data-field="volume24">Volume(24hr)</th>
                            <th data-field="prctChange"><button onClick={this.changePercent}>Percent Change</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stocks.map( (stock, index) => {
                            stockVolChange = [];
                            stockVolChange.push(stock.percent_change_1h, stock.percent_change_24h, stock.percent_change_7d)
                            return (
                                <tr>
                                <Link to={`stocks/${stock.id}`} style={ {color:'black'} }
                                >
                                    <td key={stock.id}>{stock.name.toUpperCase()}</td>
                                </Link>
                                    <td><b>{stock.symbol}</b></td>
                                    <td>{stock.market_cap_usd.split('.')[0]}</td>
                                    <td>{stock.total_supply.split('.')[0]}</td>
                                    <td>{stock.h_volume_usd}</td>
                                    <td className='center'style={ stockVolChange[0] > 0 ? {color:'green'} : {color:'red'} }>{stockVolChange[0]}&nbsp;%</td>
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
            return (
                <div>
                    {stockChart}
                </div>
            )
        }
    }


export default Stocks;