import axios from 'axios';

const useFlightHook = async (formData) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com18.p.rapidapi.com/flights/search-oneway',
    headers: {
      'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
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

export default useFlightHook;