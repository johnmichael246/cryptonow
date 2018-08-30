import React from 'react';
import './Watchlist.css';
import {
    Row,
    Col
} from 'react-materialize';
import {Link} from 'react-router-dom'
import Stock from '../../components/Stock/Stock';

class Watchlist extends React.Component {

    getOneStock = () => {
        fetch(`/api/stocks/${this.props.match.params.id}`)
        .then( response => response.json())
        .then( data => this.props.updateOneStock(data))
    }

    render() {
        let stocklist = null;
        if(this.props.user === null) {
            stocklist = 
            <div className='watchlist-font'>
                Sign up or Log in to enable the watchlist
            </div>
        } else if(this.props.user.favStocks.length >= 1) {
            stocklist =
            <div>
                <Row>
                    {this.props.user.favStocks.map( (stock, index)=> {
                        return (
                        <Col s={3} m={2} l={2} style={ {marginTop:'20px'} } key={stock.name}>
                            <Link to={`/stocks/${stock.apiId}`} key={index} className='watchlist btn waves waves-effect white-text' onClick={this.getOneStock} >
                                {stock.symbol}
                            </Link>  
                        </Col>
                        )
                    })}
                </Row>
            </div>
        } else {
        <div className='watchlist-font'>
            No favorites yet, start your Watchlist!
        </div>
        }
        return stocklist;
    }
}


export default Watchlist;