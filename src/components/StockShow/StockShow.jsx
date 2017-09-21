import React from 'react';
import './StockShow.css'
import Stocks from '../Stocks/Stocks';
const StockShow = (props) => {

        return (
            <div>
                <Stocks
                {...props}
                stocks={props.stocks} />
            </div>

        )

}

export default StockShow;