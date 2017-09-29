import React from 'react';
import LineChart from 'react-linechart';
import { StairChart } from 'react-linechart'
import '../../../node_modules/react-linechart/dist/styles.css';

class Graph extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let points = [];
        let points2 =[];
        this.props.stockVisualData.forEach( (stock,index )=> {
            points.push({x:index,y:stock.value})
            points2.push({x:index, y:stock.bitcoinValue})
        });
        let data = [{
            id:this.props.stock.apiId,
            name:this.props.stock.name,
            color:'steelblue',
            points:points,
        }
        // {
        //     name:this.props.bitcoin.name,
        //     color:'red',
        //     points:points2
        // }
        ]
        // let gsmData = this.props.stockVisualData;
        // let gsmFlat = parseFlatArray(gsmData, 'day',['value','bitcoinValue']);
        return (
            <div>
                <h4 className='centered'> Historical Values</h4>
                <LineChart
                width={600}
                height={400}
                data={data}/>
            </div>
        )
    }
}

export default Graph;