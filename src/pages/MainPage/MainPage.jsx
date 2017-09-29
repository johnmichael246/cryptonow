import React from 'react';
import './MainPage.css';
import {
    Row,
    Col
} from 'react-materialize';
import Favs from '../../components/Favs/Favs';
import News from '../../components/News/News';
import Stocks from '../../components/Stocks/Stocks';
import NavBar from '../../components/NavBar/NavBar';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    setTimer = () => {
        setInterval(() =>{
      console.log('the timer has started')
        this.props.searchStocks()
        }, 120000)
    }

    clearTimer = () => {
        console.log('the timer has been cleared')
        clearInterval(this.setTimer)
    }

    render() {
        return (
            <div className='background-main'>
                <Row>
                    <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout} />
                    <Col s={12}m={4}>
                        <News
                        articles={this.props.articles}
                        user={this.props.user} />
                    </Col>     
                    <Col s={12}m={8}>
                        <Favs
                        user={this.props.user} />
                        <Stocks.Stocks
                        user={this.props.user}
                        stocks={this.props.stocks}
                        setTimer={this.setTimer}
                        clearTimer={this.clearTimer}
                        searchStocks={this.props.searchStocks}
                        header={this.props.header} />
                    </Col>
                </Row>
            </div> 
        )
    }
}


export default MainPage;