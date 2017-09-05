import React from 'react';
import './Articles.css';
import {
    Icon,
    Col
} from 'react-materialize';
import {
    Link
} from 'react-router-dom'
import Article from '../Article/Article'
const Articles = (props) => {
    return (
        <div>
            {props.articles.map( (article, index) => {
                return (
                    <Article
                    key={article.title}
                    title={article.title}
                    urlToImage={article.urlToImage}
                    publishedAt={article.publishedAt}
                    description={article.description}
                    url={props.url}
                    favoriteArticle={props.favoriteArticle}
                    index={index} />
                )
            })}
        </div>
    )
}


export default Articles;