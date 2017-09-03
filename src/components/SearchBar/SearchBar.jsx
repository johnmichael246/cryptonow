import React from 'react';
import './SearchBar.css'
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:''
        }
    }
    componentDidMount() {
        this.setState({search:null})
    }
    search = (event) => {
        console.log(event.target.value)
        this.setState({search:event.target.value})
    }

    findStock = (query) => {
        fetch('/api/crypto/')
    }

    render() {
        return (
            <div>
                <h5>Search for stocks</h5>
                <input type="text" placeholder ="search a stock"onChange={this.search} />
                <button className='btn' onClick={this.findStock}>Search</button>
            </div>

        )
    }
}

export default SearchBar;