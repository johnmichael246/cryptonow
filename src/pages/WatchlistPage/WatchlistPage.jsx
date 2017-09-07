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





    componentDidMount() {
        let header = new Headers({'Authorization':'Bearer '+ tokenService.getToken()});
        let mainBody = JSON.stringify({stocks:this.props.user.favStocks})
        console.log(this.props.user)
        fetch('/api/favStocks', {
            method:'post',
            headers:{
                header
            },
            body:mainBody 
        })
        .then( response => console.log(response))
    }
    getAuthRequestOptions=(method)=> {
        return {
            method: method,
            headers: new Headers({'Authorization':'Bearer '+ tokenService.getToken()})
     };
}


    render() { 
        return (
            <div className='stockpage-font'>
                <NavBar
                user={this.props.user} />
                <Row>
                    <Col s={12}>
                        <Watchlist2
                        articles={this.props.articles}
                        user={this.props.user} />
                    </Col>
                </Row>
                <Row>   
                    <Col s={12}>
                    {this.props.user.favstocks ?
                    <h1>Watchlist goes here</h1> :
                    <div>
                        <Preloader size='big'/>
                        <h3>Loading...</h3> 
                    </div>
                        }

                    </Col>

                </Row>
            </div>
        )
    }
}


export default WatchlistPage;