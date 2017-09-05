import React from 'react';
import Articles from '../Articles/Articles';
import {
    Row
} from 'react-materialize';
import './News.css';


class News extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Row>
                    <h5 className='main-font'>Related News</h5>
                    <hr width='70%'/>
                    {!this.props.articles
                    ? <p>Loading Articles</p>
                    :
                    <Articles
                    articles={this.props.articles} />}

                </Row>
            </div>
        )
    }
}


export default News;