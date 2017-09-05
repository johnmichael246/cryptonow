import React from 'react';
import './ArticlesPage.css';
import {
    Row,
    Col,
    Preloader
} from 'react-materialize';
import ArticleDetails from '../../components/ArticleDetails/ArticleDetails';
import FavArticles from '../../components/FavArticles/FavArticles';
import Watchlist from '../../components/Watchlist/Watchlist';
import NavBar from '../../components/NavBar/NavBar';


class ArticlesPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            articleDetails:null
        }
    }

    getOneArticle = () => {
    fetch(`/api/news/${this.props.match.params.title}`)
    .then( response => response.json())
    .then( data => this.setState({articleDetails:data}))
}


componentDidMount() {
    this.getOneArticle()
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
                    {this.state.article ? 
                        <ArticleDetails
                        user={this.props.user}
                        articleDetails={this.state.articleDetails} /> :
                        <div>
                            <Preloader size='big'/>
                            <h3>Loading...</h3> 
                        </div>}
                    </Col>

                </Row>
            </div>
        )
    }
}


export default ArticlesPage;