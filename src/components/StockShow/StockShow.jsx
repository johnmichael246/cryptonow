import React from 'react';
import './StockShow.css'
import Stocks from '../Stocks/Stocks';
import tokenService from '../../utilities/tokenService'
class StockShow extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div>
                <Stocks
                stocks={this.props.stocks} />
            </div>

        )
    }
}

export default StockShow;