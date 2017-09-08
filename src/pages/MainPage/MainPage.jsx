import React from 'react';
import './MainPage.css';
import {
    Row,
    Col
} from 'react-materialize';
import {
    Link,
} from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Favs from '../../components/Favs/Favs';
import News from '../../components/News/News';
import StockShow from '../../components/StockShow/StockShow';
import NavBar from '../../components/NavBar/NavBar';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            search:'',
            currencyCompare:''
        } 
    }
    
    searchParams = (e) => {
        this.setState({search:e.target.value})
        console.log(this.state.search)
    }


    componentDidMount() {
        this.props.searchStocks();
        this.props.setTimer();
    }

    render() {
        let mainPage = this.props.user ?
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
                    <SearchBar
                        stocks={this.props.stocks}
                        search={this.props.search}
                        searchStocks ={this.props.searchStocks}
                        searchParams={this.searchParams}
                        currencyParams={this.props.currencyParams} />
                    <Favs
                    user={this.props.user} />
                    <StockShow
                    user={this.props.user}
                    stocks={this.props.stocks} />
                </Col>
            </Row>
        </div> :
        <div>
            <Row>
                <div className='title'>CryptoNow</div>
                <br/><br/>
                <img src="https://i.imgur.com/mVoVb7e.png" alt=""/>
            </Row>
                <br/><br/>
                <nav className='welcome-nav'>
                    <Link to='/signup' className='text-color'>SIGN UP</Link> &nbsp;&nbsp; | &nbsp;&nbsp;
                    <Link to='/login' className='text-color'>LOG IN</Link>
                </nav>

        </div>
        return mainPage;
    }
}


export default MainPage;