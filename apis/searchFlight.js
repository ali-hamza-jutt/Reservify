import axios from 'axios';

const searchFlights = async (formData) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com18.p.rapidapi.com/flights/search-oneway',
    headers: {
      'X-RapidAPI-Key': '4ae0a9d261msh291a3241b5be103p114c55jsn849906fb5d0a',
      'X-RapidAPI-Host': 'booking-com18.p.rapidapi.com'
    },
    params: {
      fromId: formData.fromId,
      toId: formData.toId,
      departureDate: formData.departureDate,
      adults: formData.adults
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default searchFlights;
