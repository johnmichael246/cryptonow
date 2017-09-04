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
                <p className='news-font'>{props.title}</p>
                <Link to={`articles/:${props.title}`}>
                    <img className="size-image"src={props.urlToImage} alt=""/>
                </Link>
                <p>{props.publishedAt}</p>
                <Icon>favorite_border</Icon> &nbsp;&nbsp;
                <Icon>email</Icon>
            </div>
        )
}


export default Article;