import React from 'react';
import './News.css';
// import Articles from '../Articles/Articles';
import Article from '../Article/Article';



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
            <div className='background-color main-font padding-top alignment'>
                <h5>Related News</h5>
                <hr width='70%'/>
                {!this.state.articles
                ? <p>Loading Articles</p>
                :
                this.props.articles.map( (article, index) => {
                    return (
                        <Article
                        key={article.title}
                        title={article.title}
                        urlToImage={article.urlToImage}
                        publishedAt={article.publishedAt}
                        description={article.description}
                        url={article.url}
                        favoriteArticle={article.favoriteArticle}
                        index={index} />
                    )
                })}
            </div>
        )
    }
}


export default News;