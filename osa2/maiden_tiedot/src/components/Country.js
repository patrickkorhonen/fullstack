import axios from 'axios'
import { useState, useEffect } from 'react';

const Country = ({name, capital, area, languages, flag}) => {
    const [temp, setTemp] = useState(null)
    const [icon, setIcon] = useState(null)
    const [wind, setWind] = useState(null)
   
    useEffect(() => {
        if (capital !== '') {
        axios
    .get(`http://api.weatherapi.com/v1/current.json?key=d4352d33934a478995290811233105&q=${capital}&aqi=no`)
    .then(response => {
      setTemp(response.data.current.temp_c)
      setIcon(response.data.current.condition.icon)
      setWind(response.data.current.wind_kph)
    })
}
}, [capital])
    
    
    if (name !== '') {     
return (
    <div>
    <h2>{name}</h2>
    <p>capital {capital}</p>
    <p>area {area}</p>
    <h3>
    languages:
    </h3>
    <ul>
     {languages.map(lang => (
        <li key={lang}>
            {lang}
        </li>
     ))}   
    </ul>
    <img src={flag} width="180"></img>
    <div>
    <h2>
        Weather in {capital}
    </h2>
    <p>
    temperature {temp} Celsius
    </p>
    <img src={icon}></img>
    <p>
    wind {Number(wind/3.6).toFixed(2)} m/s
    </p>
    </div>
    </div>
)
     } else {
        return null
     }
}

export default Country