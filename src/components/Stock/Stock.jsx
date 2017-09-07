import React from 'react';
import './Stock.css';
import tokenService from '../../utilities/tokenService';
import {
    Row,
    Col,
    Preloader,
    Input,
    Table
} from 'react-materialize';


class Stock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.populateUser()
        // this.compareStockToFavs()
    }

    populateUser = () => {
        let header = this.getAuthRequestOptions('GET');
        fetch('/api/users/populate', header)
        .then( response => response.json())
        .then( data => this.setState({user:data}))
    }

    compareStockToFavs() {
        if (this.state.user)
        this.state.user.favStocks.filter( stock => stock.apiId === this.props.stock[0].id) ?
        this.setState({button:true}) :
        this.setState({button:false})
    }

    getAuthRequestOptions = (method)=> {
        return {
            method: method,
            headers: new Headers({'Authorization':'Bearer '+ tokenService.getToken()}),
            }
    }

    render() {
  
        let button
        if (this.props.user) {
            if(this.props.user.favStocks) {
                console.log('favs')
                this.props.user.favStocks.find( s => s.apiId === this.props.stock[0].id) ?
                    button = <button className='btn' type='submit' onClick={()=>this.props.addToWatchlist(this.props.stock[0].id, this.props.stock[0].symbol, this.props.stock[0].name)}>Remove from Watchlist</button> :
                    button = <button className='btn' type='submit' onClick={()=>this.props.addToWatchlist(this.props.stock[0].id, this.props.stock[0].symbol, this.props.stock[0].name)}>Add to Watchlist</button>
            } else {
                button =<Preloader/>
            }
        } else {
            button = <Preloader/>
        }

        let bitcoinValue = this.props.stock[0].price_usd / this.props.bitcoin[0].price_usd
        let value = parseFloat(bitcoinValue.toFixed(5))
        let marketValue = this.props.stock[0].market_cap_usd.split('.')[0]
        let bitcoinMV= (marketValue/this.props.bitcoin[0].price_usd)
        let bitcoinVol24 = Math.round(this.props.stock[0]['24h_volume_usd'].split('.')[0] / this.props.bitcoin[0].price_usd)
        return (
            <div>
                <Row>
                    <Col s={12} m={6} >
                        <h2>{this.props.stock[0].name}({this.props.stock[0].symbol})</h2>
                        <h5>rank:{this.props.stock[0].rank}</h5>
                        {button}                    
                    </Col>
                    <Col s={12}m={6}>
                        <h2>{this.props.stock[0].price_usd}&nbsp;&nbsp;&nbsp;</h2>
                        <h2 style={this.props.stock[0].percent_change_24h > 0 ? {color:'green'} : {color:'red'} } > ({this.props.stock[0].percent_change_24h}%)</h2> 
                        <h6> {value} bitcoin</h6><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        
                        <Input s={3} type='select' className='margin-top'label="Convert To" defaultValue='USD' onChange={this.props.currencyParams} name='currencyParams'>
                            <option value='USD'>USD</option>
                            <option value='EU'>EU</option>
                            <option value='AUD'>AUD</option>
                            <option value='BRL'>BRL</option>
                            <option value='CAD'>CAD</option>
                            <option value='CLP'>CLP</option>
                            <option value='RUB'>RUB</option>
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table responsive={true} centered={true}>
                            <thead>
                                <tr>
                                    <th>Market Cap</th>
                                    <th>Volume(24hr)</th>
                                    <th>Supply Circulating</th>
                                    <th>Maximum Supply</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={this.props.stock[0].id}>
                                    <td className ='remove-lower-padding'>{marketValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className ='remove-lower-padding'>{this.props.stock[0]['24h_volume_usd'].split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className='centered'>{this.props.stock[0].available_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td key={0}className='centered'>{this.props.stock[0].total_supply.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                <tr>
                                    <td style ={{color:'grey'}} >{ Math.round(bitcoinMV)} <b>BTC</b></td>
                                    <td style ={{color:'grey'}} >{bitcoinVol24} <b>BTC</b></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }               
}


export default Stock;