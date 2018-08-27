import React from 'react';
import './WatchlistPage.css';
import {
    Row,
    Col,
    Preloader
} from 'react-materialize';
import Watchlist2 from '../../components/Watchlist2/Watchlist2';

class WatchlistPage extends React.Component {
    
    handleTheReturn = () => {
        this.props.history.goBack();
    }

    formatData = (str) => {
        if (str === null || str === undefined) return;
        return str.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    render() {
        let extractedWatchlist = this.props.favStocks ?
            <div className='stockpage-font'>
                <Row>   
                    <Col s={12}>
                        <Watchlist2
                            handleTheReturn={this.handleTheReturn}
                            history={this.props.history}
                            currentUser={this.props.currentUser}
                            favStocks={this.props.favStocks}
                            formatData={this.formatData} />
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