import React from 'react';
import './StockShow.css'
import Stocks from '../Stocks/Stocks';
class StockShow extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let stocklist = this.props.user.stocks ?
        <div>
            show favorite stocks
            <Stocks />
        </div> :
        <div>
            show basic stocks
            <Stocks />
        </div>
        return (
            <div>
                {stocklist}
            </div>
        )
    }
}

export default StockShow;