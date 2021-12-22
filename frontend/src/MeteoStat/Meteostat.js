import React from 'react';
import ChartHumidity from './Charts/ChartHumidity';
import ChartSolarRadiation from './Charts/ChartSolarRadiation';
import ChartTemperature from './Charts/ChartTemperature';
import ChartWindSpeed from './Charts/ChartWindSpeed';
import ChartWindDirection from './Charts/ChartWindDirection';
import ChartPressure from './Charts/ChartPressure';
import { makeStyles, Container, Grid, Paper } from '@material-ui/core';

const pvgisDataHours = require('./pvgis-interesting-data-hours.json');
const pvgisDataDays = require('./pvgis-interesting-data-days.json');
const pvgisDataWeeks = require('./pvgis-interesting-data-weeks.json');
const pvgisDataMonths = require('./pvgis-interesting-data-months.json');

const useStyles = makeStyles(() => ({
    main: {
        // backgroundColor: "#bbbbff",
        // color: "#0000ff",
    },
    grid: {

    },
    chart: {
        // backgroundColor: "#dfdfff",
    },
    paper: {
        backgroundColor: "#2f2f3f",
        color: "#aabbff",
        paddingBottom: "7%",
    }
}));

function Example(){
    const { grid, chart, paper } = useStyles()
;    return (           
        <Grid container spacing={6} wrap='wrap' className={grid}>
            <Grid item xs={6} className={chart}>
                <Paper variant='outlined' square className={paper}>
                    <ChartHumidity 
                        dataHours={pvgisDataHours} 
                        dataDays={pvgisDataDays}
                        dataWeeks={pvgisDataWeeks}
                        dataMonths={pvgisDataMonths}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} className={chart}>
                <Paper variant='outlined' square className={paper}>
                    <ChartSolarRadiation
                        dataHours={pvgisDataHours} 
                        dataDays={pvgisDataDays}
                        dataWeeks={pvgisDataWeeks}
                        dataMonths={pvgisDataMonths}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} className={chart}>
                <Paper variant='outlined' square className={paper}>
                    <ChartTemperature
                        dataHours={pvgisDataHours} 
                        dataDays={pvgisDataDays}
                        dataWeeks={pvgisDataWeeks}
                        dataMonths={pvgisDataMonths}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} className={chart}>
                <Paper variant='outlined' square className={paper}>
                    <ChartWindSpeed
                        dataHours={pvgisDataHours} 
                        dataDays={pvgisDataDays}
                        dataWeeks={pvgisDataWeeks}
                        dataMonths={pvgisDataMonths}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} className={chart}>
                <Paper variant='outlined' square className={paper}>
                    <ChartWindDirection
                        dataHours={pvgisDataHours} 
                        dataDays={pvgisDataDays}
                        dataWeeks={pvgisDataWeeks}
                        dataMonths={pvgisDataMonths}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} className={chart}>
                <Paper variant='outlined' square className={paper}>
                    <ChartPressure
                        dataHours={pvgisDataHours} 
                        dataDays={pvgisDataDays}
                        dataWeeks={pvgisDataWeeks}
                        dataMonths={pvgisDataMonths}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

function MeteoStat() {
    const { main } = useStyles();
    return(
        <Container className={main}>
            <br/>
            <br/>
            <br/>
            <br/>
            <Example/>
        </Container>
    );
}

export default MeteoStat;