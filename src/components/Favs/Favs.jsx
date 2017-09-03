import React from 'react';
import {
    Row,
    Col
} from 'react-materialize';
import './Favs.css';
import FavArticles from '../FavArticles/FavArticles';
import Watchlist from '../Watchlist/Watchlist';

const Favs = (props) => {
    return (
        <div>
            <Row>
                <Col s={12} m={6}>
                    <FavArticles
                    user={props.user} />
                </Col>
                <Col s={12} m={6}>
                    <Watchlist
                    user={props.user} />
                </Col>
            </Row>
        </div>
    )
}

export default Favs; 