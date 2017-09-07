import React from 'react';
import './StockShow.css'
import Stocks from '../Stocks/Stocks';
import tokenService from '../../utilities/tokenService'
const StockShow = (props) => {

        return (
            <div>
                <Stocks
                stocks={props.stocks} />
            </div>

        )

}

export default StockShow;