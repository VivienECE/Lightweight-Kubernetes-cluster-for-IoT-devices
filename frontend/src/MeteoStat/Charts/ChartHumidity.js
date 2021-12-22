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
  AreaChart, Area, Brush,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
// Ray entre 0 (200) et 950 en W/m2
// WindSpeed 0.5 a 5 en m/s
// Entre 50 et 100 en %
// const data2 = require('./pvgis-data.json');
// Use useState/setState instead
// const selectedData = data2.outputs.tmy_hourly;

function ChartHumidity(props){
  const [selectedData, setSelectedData] = useState(props.dataMonths);
  // pour chaque élément on regarde si c'est le meme jour
  // si oui on ajoute a un compteur et on incremente un autre compteur
  // si non on fait la moyenne du compteur en faisant compteurSomme/compeurInc
  //    et on crée un nouveau tableau avec la nouvelle valeur
  const dataHours = props.dataHours;
  const dataDays = props.dataDays;
  const dataWeeks = props.dataWeeks;
  const dataMonths = props.dataMonths;
  const average = Math.round(dataDays.reduce( (acc, elem) => acc + elem['RH'], 0) / dataDays.length * 100) / 100; 
  // const initialState = {
  //   data: selectedData,
  //   left: 'dataMin',
  //   right: 'dataMax',
  //   refAreaLeft: '',
  //   refAreaRight: '',
  //   top: 'dataMax+1',
  //   bottom: 'dataMin-1',
  //   top2: 'dataMax+20',
  //   bottom2: 'dataMin-20',
  //   animation: true,
  // };
  // const [state, setState] = useState(initialState);
  
  // const getAxisYDomain = (from, to, ref, offset) => {
  //   const refData = selectedData.slice(from - 1, to);
  //   let [bottom, top] = [refData[0][ref], refData[0][ref]];
  //   refData.forEach((d) => {
  //     if (d[ref] > top) top = d[ref];
  //     if (d[ref] < bottom) bottom = d[ref];
  //   });
  
  //   return [(bottom | 0) - offset, (top | 0) + offset];
  // };
  // const zoom = () => {
  //   let { refAreaLeft, refAreaRight } = state;
  //   const { data } = state;

  //   if (refAreaLeft === refAreaRight || refAreaRight === '') {
  //     setState(() => ({
  //       refAreaLeft: '',
  //       refAreaRight: '',
  //     }));
  //     return;
  //   }

  //   // xAxis domain
  //   if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

  //   // yAxis domain
  //   const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
  //   const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

  //   setState(() => ({
  //     refAreaLeft: '',
  //     refAreaRight: '',
  //     data: data.slice(),
  //     left: refAreaLeft,
  //     right: refAreaRight,
  //     bottom,
  //     top,
  //     bottom2,
  //     top2,
  //   }));
  // };
  // const zoomOut = () => {
  //   console.log("zoomout")
  //   console.log(state)
  //   const { data } = state;
  //   console.log(state)
  //   console.log(data)
  //   setState(() => ({
  //     data: data.slice(),
  //     refAreaLeft: '',
  //     refAreaRight: '',
  //     left: 'dataMin',
  //     right: 'dataMax',
  //     top: 'dataMax+1',
  //     bottom: 'dataMin',
  //     top2: 'dataMax+50',
  //     bottom2: 'dataMin+50',
  //   }));
  // };
  const { title, slider, stats, details } = useStyles();
  // function valuetext(value) {
  //   return `${value}°C`;
  // }
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
    // {
    //   value: 100,
    //   label: 'A',
    // }
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
  // const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = state;
  return (
          <Container>
          <Typography className={title}>Humidité</Typography>
          {/* <button type="button" className="btn update" onClick={zoomOut}>
            Zoom Out
          </button> */}
          <div style={{ width: '95%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart  
                data={selectedData}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
                // onMouseDown={(e) => {
                //   setState({ ...state, refAreaLeft: e.activeLabel })
                //   console.log("down")
                  // console.log(e.activeLabel)
                  // setSelectedData(selectedData)
                // }}
                // onMouseMove={(e) => {
                //   state.refAreaLeft && setState({ ...state, refAreaRight: e.activeLabel })
                //   console.log("move")
                //   console.log(state)
                // }}
                // // eslint-disable-next-line react/jsx-no-bind
                // onMouseUp={zoom}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis allowDataOverflow dataKey="time" 
                // domain={[left, right]}
                />
                
                <YAxis allowDataOverflow 
                //domain={[bottom, top]}
                />
                <Tooltip />
                <Brush dataKey="time" data={selectedData} height={20} stroke="#5b7bb2" fill="#404050"/>
                <Area type="monotone" dataKey="RH" stackId="1" stroke="#9984f8" fill="#8884f8" />
    
              </AreaChart>
            </ResponsiveContainer>
            {/* Slider, vertical si possible */}
            <Slider className={slider}
              defaultValue={75}
              step={25}
              marks={marks}
              track={false}
              onChangeCommitted={changeGranularity}
            />
          </div>
          <Box className={stats}>
                Moyenne : {average}%
          </Box>
          <Accordion className={details}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary'/>}
            >
              <Typography color='primary'>
              Détails
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography color='primary'>
              Humidité 2.61% plus élevée que l'année précédente
            </Typography>
            </AccordionDetails>
          </Accordion>
            {/* Slider + analyse */}
          </Container>
        );
}

export default ChartHumidity;
