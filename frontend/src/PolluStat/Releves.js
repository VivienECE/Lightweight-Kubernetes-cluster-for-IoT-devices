import React from 'react';
import AreaChart from './AreaChart_DynamoDB';
import './App.scss';
import { Navbar,NavDropdown } from 'react-bootstrap';

class Dashboard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
      return (
          <div>
          <Navbar bg="primary" variant="dark">
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
          </Navbar>
            <div class="container">
                <hr/>
                <div class = "dashboard o5 col-xl-12 "><AreaChart data={this.state.data}/></div>
                <br></br>
              </div>
          </div>
      );
  }
}

export default Dashboard;
