import React from 'react';
import './showArticle.css';
import {
    Row,
    Col,
    Icon
} from 'react-materialize';
import {
    Link
} from 'react-router-dom';


const showArticle = (props) => {
        return (
            <div key={props.title}>
                <p className='news-font'>{props.title}</p>
                    <img className="size-image"src={props.urlToImage} alt=""/>
                <p>{props.publishedAt}</p>
                <Icon>favorite_border</Icon> &nbsp;&nbsp;
                <Icon>email</Icon>
            </div>
        )
}


export default showArticle;