

const {validateFlightQueryParams,validateHotelQueryParams,validateSitesQueryParams}
 = require('../validations/index')

 const axiosInstance = require('../lib/axios.lib')




const getFlightsByOriginAndDestination = async(req, res) => {
    const errors = validateFlightQueryParams(req.query);

    if(errors.length > 0){
        return res.status(400).json({errors})
    }
    try{
       const {origin, destination} = req.query;
       const response = await axiosInstance.get(`/flights/search?origin=${origin}&destination=${destination}`
        
       );

       res.json(response.data)
    }
    catch(error){
    res.status(500).json({error:"Failed to fetch flight"})
    }
}




const getHotelByLocation = async(req, res) => {
    try{
        const errors = validateHotelQueryParams(req.query);

        if(errors.length > 0){
            console.log("Validation errors:", errors);
            return res.status(400).json({errors})
        }
        const {location} = req.query;
          const response  = await axiosInstance.get(`/hotel/search?location=${location}`,
            {
                headers:{
                    CLIENT_KEY:process.env.CLIENT_KEY,
                CLIENT_SECRET:process.env.CLIENT_SECRET,
                }
              }
          );
          res.json(response.data)
    }
    catch(error){
        res.status(500).json({error:"Failed to fetch hotel"})
    }
}



const getSitesByLocation = async(req,res)=> {
    const errors = validateSitesQueryParams(req.query);

    if(errors.length > 0) return res.status(400).json({errors})
    
    try{
      const location = req.query.location
      const response  = await axiosInstance.get(`/sites/search?location=${location}`,
        {
            headers:{
                CLIENT_KEY:process.env.CLIENT_KEY,
            CLIENT_SECRET:process.env.CLIENT_SECRET,
            }
          }

      );
      res.json(response.data)
    }
    catch(error){
        res.status(500).json({error:"Failed to fetch sites"})
    }
}

const getFlights = async (req, res) => {
    try{
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit
    const response = await axiosInstance.get(`/flights?test_error=${test_error}&rate_limit=${rate_limit}`,
        {
            headers:{
                CLIENT_KEY:process.env.CLIENT_KEY,
            CLIENT_SECRET:process.env.CLIENT_SECRET,
            }
          }
        )
      
    res.json(response.data)
    } catch(error){
        console.log(error)

        if (error.response.status === 429) {
           return res
               .status(429)
               .json({ error: "Rate limit exceeded. Please try again later." });
       } else if (
           error.response.status === 500 &&
           error.response.data.error === "Simulated error for testing purposes."
       ) {
           return res.status(500).json({ error: "Simulated error for testing purposes." });
       }
        res.status(500).json({error: "failed to fetch concerts"})
       }
   }


const getHotels = async (req, res) => {
    try{
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit
      const response = await axiosInstance.get(`/hotels?test_error=${test_error}&rate_limit=${rate_limit}`,
        {
            headers:{
                CLIENT_KEY:process.env.CLIENT_KEY,
            CLIENT_SECRET:process.env.CLIENT_SECRET,
            }
          }
      )
    res.json(response.data)
    } catch(error){
        console.log(error)

        if (error.response.status === 429) {
           return res
               .status(429)
               .json({ error: "Rate limit exceeded. Please try again later." });
       } else if (
           error.response.status === 500 &&
           error.response.data.error === "Simulated error for testing purposes."
       ) {
           return res.status(500).json({ error: "Simulated error for testing purposes." });
       }
         res.status(500).json({error: "failed to fetch hotels"})
    }
}


const getSites = async (req, res) => {
    try{
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit
      const response = await axiosInstance.get(`/sites?test_error=${test_error}&rate_limit=${rate_limit}`,
        {
            headers:{
                CLIENT_KEY:process.env.CLIENT_KEY,
            CLIENT_SECRET:process.env.CLIENT_SECRET,
            }
          }
      )
    res.json(response.data)
    } catch(error){
        console.log(error)

        if (error.response.status === 429) {
           return res
               .status(429)
               .json({ error: "Rate limit exceeded. Please try again later." });
       } else if (
           error.response.status === 500 &&
           error.response.data.error === "Simulated error for testing purposes."
       ) {
           return res.status(500).json({ error: "Simulated error for testing purposes." });
       }
         res.status(500).json({error: "failed to fetch sites"})
    }
}

module.exports = {
    getFlights,getHotels,getSites,getFlightsByOriginAndDestination,getHotelByLocation,getSitesByLocation
}