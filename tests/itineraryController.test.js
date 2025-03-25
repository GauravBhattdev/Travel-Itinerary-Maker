const {getFlightsByOriginAndDestination,getHotelByLocation,getSitesByLocation} =
 require("../controllers/itineraryController");

 const axiosInstance = require('../lib/axios.lib');

 jest.mock('../lib/axios.lib.js',()=>( {
    get:jest.fn()
 }))

 describe('Itineray Controller Tests', ()=> {
    test('should fetch Flights By Origin And Destination',async()=> {
        const mockResponse = {
            flights:[
                {
                    id: 3,
                    origin: "mopa",
                    destination: "jammu",
                    flight_number: "952",
                    departure_time: "10/7/2024, 5:37:56 PM",
                    arrival_time: "10/7/2024, 10:37:56 PM",
                    price: 244.44
                }
            ]
        }
        axiosInstance.get.mockResolvedValue(mockResponse);

        const req = {query: {origin:"mopa",destination:"jammu"}};

        const res = {json: jest.fn(),status:jest.fn(()=>res)};
        await getFlightsByOriginAndDestination(req,res)

        expect(axiosInstance.get).toHaveBeenCalledWith(`/flights/search?origin=mopa&destination=jammu`);

        expect(res.json).toHaveBeenCalledWith(mockResponse.data)
    });

    //test 2 for get sites by location
  test("Should fetch sites by location",async()=> {
    const mockResponse ={
       sites: [
        {
            id: 1,
            name: "Steuber, Grimes and Graham Site",
            location: "Daman",
            description: "Admitto carbo assentator comparo."
        }
        ]
    }

    axiosInstance.get.mockResolvedValue(mockResponse);

        const req = {query: {location:"Daman"}};

        const res = {json: jest.fn(),status:jest.fn(()=>res)};
        await getSitesByLocation(req,res)

        expect(axiosInstance.get).toHaveBeenCalledWith(`/sites/search?location=Daman`);

        expect(res.json).toHaveBeenCalledWith(mockResponse.data)


  })

 })