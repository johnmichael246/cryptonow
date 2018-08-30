import React from 'react';
import './Stocks.css'
import {
    Table,
    Col,
    Preloader
} from 'react-materialize';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';


class Stocks extends React.Component {

    componentWillMount() {
        this.props.searchStocks()
        this.props.setTimer()
    }
    componentWillUnmount() {
        this.props.clearTimer()
    }
    formatData = (num) => {
        if (num === null || num === undefined) return
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    render() {
        let customLinkComponent = ({value}) => <a href={`stocks/${value}`} style={ { color:'black'} }>{value}</a>
        let customDataMC = ({value}) => <span>{this.formatData(value)}</span>
        let customColumn = ({value}) => <span style={ value > 0 ? {color:'green'} : {color:'red'} }>{value}%</span>
        let customSymbolColumn = ({value}) => <span style={ {fontWeight:'bold'} }>{value}</span>
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
        <Griddle
        data={this.props.stocks}
        styleConfig={styleConfig}
        plugins={[plugins.LocalPlugin]}>
            <RowDefinition>
                <ColumnDefinition id='id' title='Name' customComponent={customLinkComponent}/>
                <ColumnDefinition id='symbol' title='Symbol' customComponent={customSymbolColumn}/>
                <ColumnDefinition id='market_cap' title='Market Cap'customComponent={customDataMC}/>
                <ColumnDefinition id='circulating_supply' title='Circulating Supply' customComponent={customDataMC}/>
                <ColumnDefinition id='volume_24h' title='Volume(24H)' customComponent={customDataMC}/>
                <ColumnDefinition id='percent_change_1h' title='Percent Change 1H'customComponent={customColumn}/>
                <ColumnDefinition id='percent_change_24h' title='Percent Change 24H' customComponent={customColumn}/>
                <ColumnDefinition id='percent_change_7d' title='Percent Change 7D' customComponent={customColumn}/>
            </RowDefinition>
        </Griddle> :
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