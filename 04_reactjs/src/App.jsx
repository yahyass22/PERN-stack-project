
import Car from "./components/car"
import { useState, useEffect } from "react";


const App = () => {

   const [cars, setCars] = useState([]);
   useEffect(() => {
    fetch('http://localhost:3000/api/v1/cars')
         .then(res => res.json())
         .then(data => setCars(data))
         .catch(err => console.log(err))
console.log(cars);
   }, []);

   

  return (
    <div>
        <h1> WELCOME to the car store </h1>
    
        <ul>
            {cars.map(car => ( 
                <Car key={car.id} car={car} />
            ))}
        </ul>
    
    
    
    </div>
  )
}

export default App