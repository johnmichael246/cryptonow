import React from 'react';
import './ArticleDetails.css';
import {
    Link
} from 'react-router-dom';


const ArticleDetails = (props) => {
        return (
            <div key={props.title}>
                <p className='news-font'>{props.title}</p>
                    <img className="size-image"src={props.urlToImage} alt=""/>
                <p>{props.publishedAt}</p>

            </div>
        )
}


export default ArticleDetails;