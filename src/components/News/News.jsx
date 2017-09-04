import React from 'react';
import './News.css';
import Articles from '../Articles/Articles';
import {
    Row
} from 'react-materialize';


class News extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            articles:null
        }

    }
    componentDidMount() {
        fetch('/news')
        .then( response => response.json())
        .then( data => this.setState({articles:data.articles}))
    }
    render() {
        return (
            <div>
                <Row>
                    <h5>Related News</h5>
                    <hr width='70%'/>
                    {!this.state.articles
                    ? <p>Loading Articles</p>
                    :
                    <Articles
                    articles={this.state.articles} />}

                </Row>
            </div>
        )
    }
}


export default News;