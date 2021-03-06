import React, { useState } from 'react';
import { 
  makeStyles, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Container,
  Box,
  Slider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush
} from 'recharts';

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    padding: "2%",
    fontSize: "200%",
  },
  slider: {
    marginTop:'7%',
    // padding: "3%",
  },
  stats: {
    textAlign: "center",
    padding: "2%",
    fontSize: "150%",
  },
  details: {
    marginTop: '7%',
    backgroundColor: '#404050',
  }
}));

export default function ChartSolarRadiation(props) {
  const { title, slider, stats, details } = useStyles();
  const marks = [
    {
      value: 0,
      label: 'H',
    },
    {
      value: 25,
      label: 'J',
    },
    {
      value: 50,
      label: 'S',
    },
    {
      value: 75,
      label: 'M',
    },
    {
      value: 100,
      label: 'A',
    }
  ];
  const changeGranularity = (event, value) => {
    switch(value){
      case 0:
        // Every point: every hour
        setSelectedData(dataHours);
        break;
      case 25:
        // Average of days
        setSelectedData(dataDays);
        break;
      case 50: 
        // Average of weeks
        setSelectedData(dataWeeks);
        break;
      case 75: 
        // Average of months
        setSelectedData(dataMonths);
        break;
      case 100: 
        break;
      default:
        break;
        }
  };
  const [selectedData, setSelectedData] = useState(props.dataMonths);
  const dataHours = props.dataHours;
  const dataDays = props.dataDays;
  const dataWeeks = props.dataWeeks;
  const dataMonths = props.dataMonths;
  const average = Math.round(dataDays.reduce( (acc, elem) => acc + elem['G(h)'], 0) / dataDays.length * 100) / 100; 
  
    return (
      <Container>
      <Typography className={title}>Rayonnement Solaire</Typography>
      <div style={{ width: '95%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart  
            data={selectedData}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            
            <YAxis />
            <Tooltip />
            <Brush dataKey="time" data={selectedData} height={20} stroke="#5b7bb2" fill="#404050"/>
            <Area type="monotone" dataKey="G(h)" stackId="1" stroke="#ff84d8" fill="#ff84d8" />

          </AreaChart>
        </ResponsiveContainer>
        <Slider className={slider}
              defaultValue={75}
              step={25}
              marks={marks}
              track={false}
              onChangeCommitted={changeGranularity}
              />
      </div>
      <Box className={stats}>
                Moyenne : {average}W/m2
              </Box>
            <Accordion className={details}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='primary'/>}
              >
                <Typography color='primary'>
                D??tails
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography color='primary'>
                Rayonnement solaire 21 W/m2 moins ??lev?? que l'ann??e pr??c??dente
              </Typography>
              </AccordionDetails>
            </Accordion>
            {/* Slider + analyse */}
      </Container>
    );
}