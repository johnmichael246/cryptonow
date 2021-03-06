import React from 'react';
import './HomePage.css';
import {
    Row,
    Col
} from 'react-materialize';
import Favs from '../../components/Favs/Favs';
import News from '../../components/News/News';
import Stocks from '../../components/Stocks/Stocks';

class MainPage extends React.Component {

    setTimer = () => {
        return setInterval(() =>{
            this.props.searchStocks()
        }, 120000)
    }

    clearTimer = () => {
        clearInterval(this.setTimer)
    }

    componentWillUnmount() {
        clearInterval(this.setTimer)
    }

    render() {
        const { user, stocks } = this.props 
        return (
            <div className='background-main'>
                <Row>
                    <Col s={12}m={4}>
                        <News
                        user={user} />
                    </Col>     
                    <Col s={12}m={8}>
                        <Favs
                        user={user} />
                        <Stocks.Stocks
                        user={user}
                        stocks={stocks}
                        setTimer={this.setTimer}
                        clearTimer={this.clearTimer}
                        searchStocks={this.props.searchStocks} />
                    </Col>
                </Row>
            </div> 
        )
    }
}


export default MainPage;