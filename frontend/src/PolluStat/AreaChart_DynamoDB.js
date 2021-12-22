import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import axios from 'axios'
import moment from 'moment'

export default class Example extends PureComponent {
      state = {
        //Assing a array to your pokeList state
        data: [],
        //Have a loading state where when data retrieve returns data.
        loading: true
    }

  async componentDidMount() {
      //Have a try and catch block for catching errors.
      try {
        axios.get('http://localhost:3000/mesure')
        .then((response) => {
            this.setState({ data : response.data.msg.sort(function(a,b){
              return new Number(b.datetime) - new Number(a.datetime);
            }) });
            console.log(response)
         })
        } catch(err) {
              console.log("Error fetching data-----------", err);
        }
  }


  render() {
    console.log(this.state.data)
    return (
      <div>
      <h5 class="texte">CO2 en PPM</h5>
      <div style={{ width: '95%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={this.state.data}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
               dataKey = 'datetime'
               domain = {['auto', 'auto']}
               tickFormatter = {(unixTime) => moment(unixTime).format('DD/MM')}
               type = 'number'
             />
            <YAxis />
            <Tooltip />
            <Area type="monotone" name="PPM" dataKey="pollution" stackId="1" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </div>
    );
  }
}
