const fs = require('fs');
const data = require('./pvgis-interesting-data-days.json');
// 8760 pas
// sumRH = 0;
// denRH = 0;
// sumT2m = 0;
// denT2m = 0;
// for(i  = 0; i < 24*365; i++) {
//     sumRH += data.outputs.tmy_hourly[i].RH;
//     denRH++;
//     if( !(data.outputs.tmy_hourly[i]['time'].split(':')[1] >= 0000 && 
//         data.outputs.tmy_hourly[i]['time'].split(':')[1] <= 0700) )
//     {
//         sumT2m += data.outputs.tmy_hourly[i].T2m;
//         denT2m++;
//     }
// }
// console.log(data.outputs.tmy_hourly[1]['time'].split(':')[1]);
// console.log(data.outputs.tmy_hourly[1]);
// console.log('moyenne : ' + sumRH/(denRH));
// console.log('moyenne : ' + sumT2m/(denT2m));
let sumRH = 0; let denRH = 0;
let sumT2m = 0; let denT2m = 0;
let sumGh = 0; let denGh = 0;
let sumGbn = 0; let denGbn = 0;
let sumGdh = 0; let denGdh = 0;
let sumIRh = 0; let denIRh = 0;
let sumWS10m = 0; let denWS10m = 0;
let sumWD10m = 0; let denWD10m = 0;
let sumSP = 0; let denSP = 0;
let avgRH = 0;
let avgT2m = 0;
let avgGh = 0;
let avgGbn = 0;
let avgGdh = 0;
let avgIRh = 0;
let avgWS10m = 0;
let avgWD10m = 0;
let avgSP = 0;
let day = 1;
let week = 1;
let month = 1;
let recDay = 0;
let recMonth = 0;
// Si on est le meme jour, on ajoute la RH à sumRH et on incremente denRH
// Sinon -> on fait sumRH/denRH et on ajoute ca a un tableau de jours
// Puis on passe au jour suivant
// Si on est en mois 1, 3, 5, 7, 8, 10, 12
const monthsWeeks = data.map( (dataElem) => {
    // Si on est sur le même jour on ajoute les données pour moyenner
    // if(parseInt(dataElem['time'].split('-')[0]) === month){
    // if(day < 8){
    sumRH += dataElem['RH'];
    sumT2m += dataElem['T2m'];
    sumGh += dataElem['G(h)'];
    sumGbn += dataElem['Gb(n)'];
    sumGdh += dataElem['Gd(h)'];
    sumIRh += dataElem['IR(h)'];
    sumWS10m += dataElem['WS10m'];
    sumWD10m += dataElem['WD10m'];
    sumSP += dataElem['SP'];
    denRH++;
    denT2m++;
    denGh++;
    denGbn++;
    denGdh++;
    denIRh++;
    denWS10m++;
    denWD10m++;
    denSP++;
    day++;
    // }
    // Sinon on a changé de jour, on fait les moyennes et on switch
        // Moyenne = sumRH/denRH
        
        // Nouvelle entrée : annee mois jour -> moyenne
        // console.log('Average of [' + month + '/' + day + '] - ' + avgDay);
        // On passe au jour suivant
        // if(parseInt(dataElem['time'].slice(4,6)) !== month) {
        //     month++;
        //     day = 1;
        // }
        // return un 'time' ou l'on met month-day
    if( day === 8 ) {
        avgRH = sumRH/denRH;
        avgT2m = sumT2m/denT2m;
        avgGh = sumGh/denGh;
        avgGbn = sumGbn/denGbn;
        avgGdh = sumGdh/denGdh;
        avgIRh = sumIRh/denIRh;
        avgWS10m = sumWS10m/denWS10m;
        avgWD10m = sumWD10m/denWD10m;
        avgSP = sumSP/denSP;
        sumRH = 0; denRH = 0;
        sumT2m = 0; denT2m = 0;
        sumGh = 0; denGh = 0;
        sumGbn = 0; denGbn = 0;
        sumGdh = 0; denGdh = 0;
        sumIRh = 0; denIRh = 0;
        sumWS10m = 0; denWS10m = 0;
        sumWD10m = 0; denWD10m = 0;
        sumSP = 0; denSP = 0;
        let time = week.toString()// + '-' + recDay.toString();
        week++;
        day = 1;
        return({
            'time': time,
            // 'month': recMonth, 
            // 'day': recDay, 
            'T2m': avgT2m,
            'RH': avgRH,
            'G(h)': avgGh,
            'Gb(n)': avgGbn,
            'Gd(h)': avgGdh,
            'IR(h)': avgIRh,
            'WS10m': avgWS10m,
            'WD10m': avgWD10m,
            'SP': avgSP,
        });
        // recDay = day;
        // recMonth = month;
        // month++;
    }   
}).filter( (dataElem) => {
    return typeof dataElem !== 'undefined'
});

avgRH = sumRH/denRH;
avgT2m = sumT2m/denT2m;
avgGh = sumGh/denGh;
avgGbn = sumGbn/denGbn;
avgGdh = sumGdh/denGdh;
avgIRh = sumIRh/denIRh;
avgWS10m = sumWS10m/denWS10m;
avgWD10m = sumWD10m/denWD10m;
avgSP = sumSP/denSP;
sumRH = 0; denRH = 0;
sumT2m = 0; denT2m = 0;
sumGh = 0; denGh = 0;
sumGbn = 0; denGbn = 0;
sumGdh = 0; denGdh = 0;
sumIRh = 0; denIRh = 0;
sumWS10m = 0; denWS10m = 0;
sumWD10m = 0; denWD10m = 0;
sumSP = 0; denSP = 0;
let time = (week).toString()// + '-' + (recDay + 1).toString();
monthsWeeks.push({
    'time': time,
    // 'month': recMonth, 
    // 'day': recDay+1, 
    'T2m': avgT2m,
    'RH': avgRH,
    'G(h)': avgGh,
    'Gb(n)': avgGbn,
    'Gd(h)': avgGdh,
    'IR(h)': avgIRh,
    'WS10m': avgWS10m,
    'WD10m': avgWD10m,
    'SP': avgSP,
});
// Nouvelle entrée : annee mois jour -> moyenne
// console.log('Average of [' + month + '/' + day + '] - ' + avgDay);
fs.writeFileSync('./pvgis-interesting-data-weeks.json', JSON.stringify(monthsWeeks));
// console.log(daysData);