import React from 'react';
import './WatchlistPage.css';
import {
    Row,
    Col,
    Preloader
} from 'react-materialize';
import Watchlist2 from '../../components/Watchlist2/Watchlist2';

class WatchlistPage extends React.Component {
    constructor(props) {
        super(props);
    }
    handleTheReturn = () => {
        this.props.history.goBack();
    }

    render() {
        let extractedWatchlist = this.props.favStocks ?
            <div className='stockpage-font'>
                <Row>   
                    <Col s={12}>
                        <Watchlist2
                            handleTheReturn={this.handleTheReturn}
                            history={this.props.history}
                            user={this.props.user}
                            favStocks={this.props.favStocks} />
                    </Col>
                </Row>
            </div>:
            <div >
                <Preloader size='big'/>
                <h3>Loading...</h3> 
            </div>    
        return extractedWatchlist;
    }
}


export default WatchlistPage;