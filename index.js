const cors = require("cors");
const express = require("express");
require("dotenv").config();

const { createItinerary, getItinerary} = require('./controllers/dataController')

const {  getFlights,getHotels,getSites,getFlightsByOriginAndDestination,getHotelByLocation ,getSitesByLocation} 
= require('./controllers/itineraryController');
const { sequelize } = require("./models");

const app = express();

app.use(express.json());
app.use(cors())


app.post('/itinerary', createItinerary);
app.get('/itinerary/:id', getItinerary);

app.get('/data/flights', getFlights);
app.get('/data/hotels', getHotels)
app.get('/data/sites', getSites);
app.get('/flights/search', getFlightsByOriginAndDestination)
app.get('/hotel/search', getHotelByLocation)
app.get('/sites/search', getSitesByLocation)    

sequelize.authenticate().then(() => {
    console.log("database connected")
}).catch(error => {
console.error("unable to connect database", error)
} );


app.listen(3000, ()=> {
    console.log("server is running on port 3000")
})
