import React from 'react';
import './Watchlist.css';
import {
    Row,
    Col
} from 'react-materialize';
import {Link} from 'react-router-dom'
import Stock from '../../components/Stock/Stock';

class Watchlist extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        let stocklist = this.props.user && this.props.user.favStocks.length > 1 ?
        <div>
            <Row>
                {this.props.user.favStocks.map( (stock, index)=> {
                    return (
                    <Col s={3} m={2} l={2} style={ {marginTop:'20px'} }>
                            <div className='watchlist btn waves' >
                        <Link onClick={this.props.updateStockLink} to={`/stocks/${stock.apiId}`} >
                                <div key={stock.symbol}>{stock.symbol}</div>
                        </Link>  
                            </div>
                    </Col>
                    )
                })}
            </Row>
        </div> :
        <div>
            No favorites yet, start your watchlist by searching for stocks!
        </div>;
        return stocklist;
    }
}


export default Watchlist;