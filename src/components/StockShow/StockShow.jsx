import React from 'react';
import './StockShow.css'
import Stock from '../Stock/Stock';
class StockShow extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let stocklist = this.props.user.stocks ?
        <div>
            some favorite stocks
            <Stock />
        </div> :
        <div>
            default stocks
            <Stock />
        </div>
        return (
            <div>
                {stocklist}
            </div>

        )
    }
}

export default StockShow;