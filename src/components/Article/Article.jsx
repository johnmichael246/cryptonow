import React from 'react';
import './Article.css';

const Article = (props) => (
    <div key={props.title}>
        <p className='news-font news-padding'>{props.title}</p>
        <a href={`${props.url}`} target='_blank'>
            <img className="size-image image-border"src={props.urlToImage} alt=""/><br/>
        </a>
    </div>
)


export default Article