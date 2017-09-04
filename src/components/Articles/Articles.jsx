import React from 'react';
import './Articles.css';
import {
    Icon
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
                    <Article key={article.title}
                    title={article.title}
                    urlToImage={article.urlToImage}
                    publishedAt={article.publishedAt} />
                )
            })}
        </div>
    )
}


export default Articles;