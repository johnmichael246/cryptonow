import React from 'react';
import './Articles.css';

const Articles = ({articles}) => {
    return (
        <div>
            {articles.map( (article, index) => {
                return (
                    <div key={article.title}>
                        <p className='news-font'>{article.title}</p>
                        <a href={article.url}>
                            <img className="size-image"src={article.urlToImage} alt=""/>
                        </a>
                        <p>{article.publishedAt}</p>
                        
                    </div>
                )
            }
            )}

        </div>
    )
}


export default Articles;