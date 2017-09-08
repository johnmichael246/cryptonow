import React from 'react';
import './WatchlistPage.css';
import {
    Row,
    Col,
    Preloader
} from 'react-materialize';
import Watchlist2 from '../../components/Watchlist2/Watchlist2';
import NavBar from '../../components/NavBar/NavBar';
import tokenService from '../../utilities/tokenService';


class WatchlistPage extends React.Component {
    constructor(props) {
        super(props);
    }
    // updateFavorites = () => {
    //     console.log('I am called! But WHY?!?')
    //     if(this.props.user) {
    //         let header = new Headers({'Authorization':'Bearer '+ tokenService.getToken()});
    //         header.append('Content-Type','application/json')
    //         let mainBody = JSON.stringify({stocks:this.props.user.favStocks})
    //         fetch('/api/favStocks', {
    //             method:'post',
    //             headers:header,
    //             body:mainBody 
    //         })
    //         .then( response => response.json())
    //         // .then(data => console.log('favorites', data))
    //         .then( data => this.props.updateFavStockState(data))
    //     }
    // }

    componentDidMount() {
        this.props.updateFavorites();
    }


    render() {
        let extractedWatchlist = this.props.user ?
            <div className='stockpage-font'>
                <Row>   
                    <NavBar
                    user={this.props.user} />
                    <Col s={12}>
                        <Watchlist2
                            user={this.props.user}
                            favStocks={this.props.favStocks} />
                    </Col>
                </Row>
            </div>:
            <div >
                <Preloader size='big'/>
                <h3>Loading...</h3> 
            </div>    
        return (extractedWatchlist)
    }
}


export default WatchlistPage;