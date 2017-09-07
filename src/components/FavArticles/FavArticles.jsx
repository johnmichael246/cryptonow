import React from 'react';
import './FavArticles.css';
import {
    Row,
    Col
} from 'react-materialize';

import Article from '../../components/Article/Article';

class FavArticles extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        let favArticles = this.props.user.favArticles > 1 ?
        <div>
            <Row>
                <Article />
            </Row>
        </div> :
        <div>
            Check out the Newsfeed and save your favorite articles to here!
        </div>
        return (
            <div>
                {favArticles}
            </div>
        )
    }
}


export default FavArticles;