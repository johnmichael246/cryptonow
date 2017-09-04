import React from 'react';
import './SearchBar.css';
import {
    Row,
    Col,
    Input,
} from 'react-materialize';



const SearchBar = (props) => {
    return (
        <div>
            <h5>Search for stocks</h5>
            <Row>
                <Input s={10} type="text" placeholder ="search a stock"onChange={props.searchParams} name='seachParams'/>
                <Input s={2} type='select' label="Convert To" defaultValue='2' onChange={props.currencyParams} name='currencyParams'>
                    <option value='USD'>USD</option>
                    <option value='EU'>EU</option>
                    <option value='BTC'>BTC</option>
                </Input>
                <button className='btn waves-effect waves-light' onClick={props.searchStocks}>Search</button>
            </Row>
        </div>
    )
}





export default SearchBar;