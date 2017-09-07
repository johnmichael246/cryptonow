import React from 'react';
import {
    Row,
    Col
} from 'react-materialize';
import './Favs.css';
import Watchlist from '../Watchlist/Watchlist';

const Favs = (props) => {
    return (
        <div>
            <Row>
                <Col s={12}>
                    <Watchlist
                    user={props.user} />
                </Col>
            </Row>
        </div>
    )
}

export default Favs; 