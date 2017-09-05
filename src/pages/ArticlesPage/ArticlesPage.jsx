import React from 'react';
import './ArticlesPage.css';
import {
    Row,
    Col
} from 'react-materialize';
import Stock from '../../components/Stock/Stock';
import Article from '../../components/Article/Article';
import showArticle from '../../components/showArticle/showArticle';
import FavArticles from '../../components/FavArticles/FavArticles';
import Watchlist from '../../components/Watchlist/Watchlist';
import NavBar from '../../components/NavBar/NavBar';


class ArticlesPage extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() { 
        return (
            <div>
                <NavBar
                user={this.props.user} />
                <Row>
                    <Col s={6}>
                        <FavArticles
                        articles={this.props.articles}
                        user={this.props.user} />
                    </Col>
                    <Col s={6}>
                        <Watchlist
                        articles={this.props.articles}
                        user={this.props.user} />
                    </Col>
                </Row>
                <Row>   
                    <Col s={12}>
                        <Article
                        user={this.props.user} />
                    </Col>
                    <Col s={12}>
                        <Stock
                        user={this.props.user} />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ArticlesPage;