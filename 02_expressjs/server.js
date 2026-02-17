import express from 'express';  

const app = express();
const PORT = 3000;
//group router to not repeat /api/v1/cars for each route

const router = express.Router();

app.use(express.json()); // to parse json body from request MIDDLARE FUNCTION

// DDING A MIDLWARE TO LOG EACH REQUEST
app.use((req,res,next) => {
    
    const timestamp = new Date().toISOString(); 
    
    console.log(`[${timestamp}]  ${req.method} ${req.url}`); // log the method and url of the request     // to pass the control to the next middleware or route handler
    next(); // to pass the control to the next middleware or route handler
});








let cars = [
    {id: 1, name: 'BMW', model: 'X5', price: '50000', year: 2020},
    {id: 2, name: 'Audi', model: 'A4', price: '40000', year: 2019},
    {id: 3, name: 'Mercedes', model: 'C-Class', price: '45000', year: 2021},
];


//this is a root route, it will be hit when we visit http://localhost:3000/
router.get('/', (req, res) => { 
    res.json(cars);
     });     
router.get('/:id', (req, res) => {    
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);
    if (!car) {
        return res.status(404).send('Car not found');
    }
    res.json(car);          

    });    
router.get('/', (req, res) => {
    res.send('ALL Cars');
    });
    
    // making new car with post method, we will send data in body of request, so we need to use express.json() middleware to parse json body from request
router.post('/', (req, res) => {
    const { name, model, price, year } = req.body;
    if (!name || !model || !price || !year){
        return res.status(400).json({ error : 'Missing Fields'});
    }

    const newCar = {
        id: cars.length + 1,
        name,   
        model,
        price : Number(price),
        year : Number(year),
    };
    cars.push(newCar);
    res.status(201).json(newCar);
    });
 
 
    //UPDATE CAR BY ID    if someone gives id 5123 it will be available in req.params.id  
router.put('/:id', (req, res) => {
    const id = Number(req.params.id); // wich car u want to update
    const index = cars.findIndex((c) => c.id === id) // find the INDEX of the car
    //if doesnt exist
    if (index === -1) {
        return res.status(404).json({error : 'Car not found'});
        }
    const { name , model , price ,year} = req.body; // new data to update the car
    if(name) cars[index].name = name; // if name is provided in body then update the name of the car
    if(model) cars[index].model = model;   
    if(price) cars[index].price = Number(price);
    if(year) cars[index].year = Number(year);

    res.json(cars[index]); 

    });

// deleting a car    
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex((c) => c.id === id);

    if (index === -1) { 
        return res.status(404).json({ error: 'Car not found' });
     }
    
     const deleted = cars.splice(index, 1); // remove the car from the array and return the deleted car
        res.json({ message : "CAR DELETED", car : deleted }); // return the deleted car
        //  });
    }); 
    



app.use('/api/v1/cars', router);

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));    
