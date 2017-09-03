import React from 'react';
import './ArticlesPage.css';
import {
    Row,
    Col
} from 'react-materialize';
import Stock from '../../components/Stock/Stock';
import FavArticles from '../../components/FavArticles/FavArticles';
import Watchlist from '../../components/Watchlist/Watchlist';


class ArticlesPage extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() { 
        return (
            <div>
            ARTICLES PAGE
            <Row>
                <Col s={6}>
                    <FavArticles
                    user={this.props.user} />
                </Col>
                <Col s={6}>
                    <Watchlist
                    user={this.props.user} />
                </Col>
            </Row>
            <Row>   
                <Col s={12}>
                    <Stock />
                </Col>
            </Row>
            </div>
        )
    }
}


export default ArticlesPage;