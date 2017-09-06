import React from 'react';
import './News.css';
import Articles from '../Articles/Articles';



class News extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            articles:null
        }

    }
    componentDidMount() {
        fetch('api/news')
        .then( response => response.json())
        .then( data => this.setState({articles:data.articles}))
    }

    favoriteArticle =(e) => {
        alert(e.target.id)
    }

    render() {
        return (
            <div className='background-color main-font'>
                <h5>Related News</h5>
                <hr width='70%'/>
                {!this.state.articles
                ? <p>Loading Articles</p>
                :
                <Articles
                articles={this.state.articles}
                favoriteArticle={this.favoriteArticle} />}
            </div>
        )
    }
}


export default News;