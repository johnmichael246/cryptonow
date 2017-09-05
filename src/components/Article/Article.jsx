import React from 'react';
import './Article.css';
import {
    Icon
} from 'react-materialize';
import {
    Link
} from 'react-router-dom';


const Article = (props) => {
        return (
            <div key={props.title}>
                <p className='news-font'>{props.title}</p>
                <Link to={`articles/${props.title}`}>
                    <img className="size-image image-border"src={props.urlToImage} alt=""/>
                </Link><br/>
                <span id={props.index}
                onClick={props.favoriteArticle} >
                <Icon
                >favorite_border</Icon> &nbsp;&nbsp;   
                </span>
                <Icon>email</Icon>
            </div>
        )
}


export default Article;