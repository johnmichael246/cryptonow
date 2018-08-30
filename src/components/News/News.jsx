import React from 'react';
import './News.css';
import Article from '../Article/Article';


class News extends React.Component {
    state= {
        articles:[]
    }

    async componentDidMount() {
        let response = await fetch('api/news')
        response = await response.json()
        this.setState({ articles:response.articles })
    }

    favoriteArticle =(e) => {
        alert(e.target.id)
    }

    render() {
        return (
            <div className='background-color main-font padding-top alignment'>
                <h5>Related News</h5>
                <hr width='70%'/>
                {!this.state.articles.length > 0
                ? <p>Loading Articles</p>
                :
                this.state.articles.map( (article, index) => (
                    <Article
                    key={article.title}
                    title={article.title}
                    urlToImage={article.urlToImage}
                    publishedAt={article.publishedAt}
                    description={article.description}
                    url={article.url}
                    favoriteArticle={article.favoriteArticle}
                    index={index} />
                ))}
            </div>
        )
    }
}


export default News;