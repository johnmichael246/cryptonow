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
import Stocks from '../../components/Stocks/Stocks';
import NavBar from '../../components/NavBar/NavBar';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            search:'',
            currencyCompare:''
        } 
    }
    
    componentDidMount() {
        this.props.populateDatabase();
    }

    searchParams = (e) => {
        this.setState({search:e.target.value})
        console.log(this.state.search)
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
        // let mainPage = this.props.user ?
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
                    <SearchBar
                        stocks={this.props.stocks}
                        search={this.props.search}
                        searchStocks ={this.props.searchStocks}
                        searchParams={this.searchParams}
                        currencyParams={this.props.currencyParams} />
                    <Favs
                    user={this.props.user} />
                    <Stocks
                    user={this.props.user}
                    stocks={this.props.stocks}
                    setTimer={this.setTimer}
                    clearTimer={this.clearTimer}
                    searchStocks={this.props.searchStocks} />
                </Col>
            </Row>
        </div> 
        )
        // :
        // <div>
        //     <Row>
        //         <div className='title'>CryptoNow</div>
        //         <br/><br/>
        //         <img className='title-page-img'src="https://i.imgur.com/QWoAAtn.png" alt=""/>
        //     </Row>

        //         <nav className='welcome-nav'>
        //             <Link to='/signup' className='text-color text-size'>SIGN UP</Link> &nbsp;&nbsp; | &nbsp;&nbsp;
        //             <Link to='/login' className='text-color text-size'>LOG IN</Link>
        //         </nav>

        // </div>
        // return mainPage;
    }
}


export default MainPage;