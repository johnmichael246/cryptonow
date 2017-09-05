import React from 'react';
import './Article.css';
import {
    Row,
    Col,
    Icon
} from 'react-materialize';
import {
    Link
} from 'react-router-dom';


const Article = (props) => {
        return (
            <div key={props.title}>
                <p className='news-font'>{props.title.toUpperCase()}</p>
                <Link to={`articles/:${props.title}`}
                params={
                    {title:props.title, urlToImage:props.urlToImage,publishedAt:props.publishedAt,description:props.description, url:props.url}
                }>
                    <img className="size-image image-border"src={props.urlToImage} alt=""/>
                </Link>
                <p>{props.publishedAt}</p>
                <Icon>favorite_border</Icon> &nbsp;&nbsp;
                <Icon>email</Icon>
            </div>
        )
}


export default Article;