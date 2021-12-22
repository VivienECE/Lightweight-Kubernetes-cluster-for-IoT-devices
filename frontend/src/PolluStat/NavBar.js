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
        <div>
          <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">
          <img src="https://www.zupimages.net/up/21/13/lbxl.png" class="rounded float-left img-fluid" width="100" height="50" alt=""/>
          </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/pollustat/releves">Relevés</Nav.Link>
              <Nav.Link href="/pollustat/infos">Infos</Nav.Link>
              <Nav.Link href="/pollustat">A Propos</Nav.Link>
              <Nav.Link href="/meteostat">MeteoStat</Nav.Link>
            </Nav>
          </Navbar>
        <div class="body-second"/>
        </div>
      );
  }
}

export default Toolbar;
