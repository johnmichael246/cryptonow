import React from 'react';
import './StockShow.css'
import Stocks from '../Stocks/Stocks';
class StockShow extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let stocklist = this.props.user.favStocks ?
        <div>
            <p>show favorite stocks</p>
            <Stocks
            stocks={this.props.stocks} />
        </div> :
        <div>
            <p>show basic stocks</p>
            <Stocks
            stocks={this.props.stocks} />
        </div>
        return (
            <div>
                {stocklist}
            </div>
        )
    }
}

export default StockShow;