import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import NavBarPollustat from './PolluStat/NavBar';
import FooterPollustat from './PolluStat/Footer';
import InfosPollustat from './PolluStat/Infos';
import MeteoStat from './MeteoStat/Meteostat';
import RelevesPollustat from './PolluStat/Releves';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './PolluStat/App.css';

const theme = createMuiTheme({
  palette: {
    background: {
        default: "#333841",
    },
    text: {
        primary:"#ffffff",
    },
    primary: {
      light: '#9bc0ff',
      main: '#82b1ff',
      dark: '#5b7bb2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#70d9e7',
      main: '#4dd0e1',
      dark: '#35919d',
      contrastText: '#000',
    },
  },
});

class Page extends React.Component{
  constructor(props){
      super(props);
      this.state = {
      };
  }

  render(){
      return (
              <ThemeProvider theme={theme}>
                  <CssBaseline/>
                  <meta name="viewport" content="width=device-width, initial-scale=0.7"></meta>
                 <Switch>
                     <Route path="/pollustat/infos">
                         <NavBarPollustat/>
                         <InfosPollustat/>
                         <FooterPollustat/>
                     </Route>
                     <Route path="/pollustat/releves">
                         <NavBarPollustat/>
                         <RelevesPollustat/>
                         <FooterPollustat/>
                     </Route>
                     <Route path="/pollustat">
                         <NavBarPollustat/>
                         <FooterPollustat/>
                     </Route>

                    <Route path="/meteostat">
                        <Header/>
                        <MeteoStat/>
                    </Route>
                    <Route path="/">
                        <Header/>
                    </Route>

                 </Switch>
              </ThemeProvider>
      );
  }
}

export default Page;
