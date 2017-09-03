import React from 'react';
import './MainPage.css';
import {
    Row,
    Col
} from 'react-materialize';
import SearchBar from '../../components/SearchBar/SearchBar';
import Favs from '../../components/Favs/Favs';
import News from '../../components/News/News';
import StockShow from '../../components/StockShow/StockShow';
import FavArticles from '../../components/FavArticles/FavArticles';

class MainPage extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        let mainPage = this.props.user ?
        <div>
            <Row>
                <Col s={4}>
                    <News
                    user={this.props.user} />
                </Col>
                    
                <Col s={8}>
                    <SearchBar />
                    <Favs
                    user={this.props.user} />
                    <StockShow
                    user={this.props.user} />
                </Col>
            </Row>
        </div> :
        <div>
            MainPage:User is logged out
        </div>
        return (

            <div>
                {mainPage}
            </div>
        )
    }
}


export default MainPage;