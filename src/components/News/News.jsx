import React from 'react';
import './News.css';
import Article from '../Article/Article';
import {
    Row,
    Col
} from 'react-materialize';
let newsURL = 'https://newsapi.org/v1/articles?source=techcrunch&language=en'


class News extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            articles:[]
        }

    }
    componentDidMount() {
        fetch('/news')
        .then( response => response.json())
        .then( data => JSON.stringify(data))
        .then(data => console.log(data))
    }
    render() {
        return (
            <div>
                <Row>
                    <h5>Related News</h5>
                    <hr width='70%'/>
                    <Article />
                </Row>
            </div>
        )
    }
}


export default News;