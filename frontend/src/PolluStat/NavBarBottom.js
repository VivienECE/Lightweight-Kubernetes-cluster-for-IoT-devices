import React from 'react';
import { Nav,Navbar } from 'react-bootstrap';
import './App.scss';

class Toolbar extends React.Component{

  constructor(props){
      super(props);
      this.state = {
      };
  }

  render(){
      return (
        <Navbar bg="primary" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="/pollustat/releves">Relevés</Nav.Link>
            <Nav.Link href="/pollustat/infos">Infos</Nav.Link>
            <Nav.Link href="/propos">A Propos</Nav.Link>
          </Nav>
        </Navbar>
      );
  }
}

export default Toolbar;
