import React from 'react';
import './Watchlist.css';
import {
    Row,
    Col
} from 'react-materialize';

import Stock from '../../components/Stock/Stock';

class Watchlist extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        let stocklist = this.props.user.favStocks >= 1 ?
        <div>
            <Row>
                <Stock />
            </Row>
        </div> :
        <div>
            No favorites yet, start your watchlist by searching for stocks!
        </div>
        return (
            <div>
                {stocklist}
            </div>
        )
    }
}


export default Watchlist;