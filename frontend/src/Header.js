import { 
    AppBar, 
    Toolbar, 
    Typography, 
    makeStyles,
    Button,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

const headersData = [
    {
      label: "PolluStat",
      href: "/pollustat",
    },
    {
      label: "MeteoStat",
      href: "/meteostat",
    },
];

const useStyles = makeStyles(() => ({
    header: {
        // backgroundColor: "#400Caa",
        paddingRight: "79px",
        paddingLeft: "118px",
    },
    logo: {
        color: "#FFFFFF",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
 }));

export default function Header() {
    const { header, logo, menuButton, toolbar } = useStyles();
    const history = useHistory();
    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {InseecStatLogo}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };
    const InseecStatLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            InseecStat
        </Typography>
    );
    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
                className: menuButton,
              }}
              onClick={(e) => {
                  e.preventDefault();
                  history.push(href);
              }}
            >
              {label}
            </Button>
          );
        });
      };
    
    return (
      <div>
        <header>
          <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>
      </div>
    );
}