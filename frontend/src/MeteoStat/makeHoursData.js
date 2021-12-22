const fs = require('fs');
const data = require('./pvgis-interesting-data-hours.json');
// 8760 pas
let time = '';
// Si on est le meme jour, on ajoute la RH à sumRH et on incremente denRH
// Sinon -> on fait sumRH/denRH et on ajoute ca a un tableau de jours
// Puis on passe au jour suivant
// Si on est en mois 1, 3, 5, 7, 8, 10, 12
const dataHours = data.map( (dataElem) => {
    // Si on est sur le même jour on ajoute les données pour moyenner
    // if(parseInt(dataElem['time'].split('-')[0]) === month){
    // if(day < 8){
   
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
    time = dataElem['time'].slice(4,6)+'-'+dataElem['time'].slice(6);
        return({
            ...dataElem,
            'time': time,
        });
});

// console.log(dataHours)
// Nouvelle entrée : annee mois jour -> moyenne
// console.log('Average of [' + month + '/' + day + '] - ' + avgDay);
fs.writeFileSync('./pvgis-interesting-data-hours.json', JSON.stringify(dataHours));
// console.log(daysData);