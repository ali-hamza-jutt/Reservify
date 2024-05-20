import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Define the getRandomPrice function before using it
const getRandomPrice = () => {
  return Math.floor(Math.random() * (2000 - 1200 + 1) + 1200);
};

const FlightResultScreen = () => {
  const route = useRoute();
  const { flightData } = route.params;

  const flights = flightData.data.flights.map(flight => ({
    id: flight.id,
    airline: flight.bounds[0].segments[0].marketingCarrier.name,
    flightNumber: flight.bounds[0].segments[0].flightNumber,
    duration: flight.bounds[0].segments[0].duration,
    cabinClassName: flight.bounds[0].segments[0].cabinClassName,
    arrivedAt: flight.bounds[0].segments[0].arrivedAt,
    numberOfStops: flight.bounds[0].segments.length - 1,
    imageUrl: `https://www.gstatic.com/flights/airline_logos/70px/${flight.bounds[0].segments[0].marketingCarrier.code}.png`,
    price: getRandomPrice(), // Call getRandomPrice function
  }));

  // Function to convert milliseconds to hours and minutes format
  const formatDuration = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hr ${minutes} mnts`;
  };

  const renderItem = ({ item }) => {
    // Parse the 'arrivedAt' time
    const arrivedTime = item.arrivedAt.split('T')[1].substring(0, 5); // Extract '18:00'

    // Parse the duration into hours and minutes
    const durationHours = Math.floor(item.duration / (1000 * 60 * 60));
    const durationMinutes = Math.floor((item.duration % (1000 * 60 * 60)) / (1000 * 60));

    // Calculate the departure time by adding duration to arrived time
    const [arrivedHours, arrivedMinutes] = arrivedTime.split(':').map(Number);
    const departureHours = (arrivedHours + durationHours) % 24;
    const departureMinutes = (arrivedMinutes + durationMinutes) % 60;

    // Format departure time
    const departureTime = `${departureHours < 10 ? '0' : ''}${departureHours}:${departureMinutes < 10 ? '0' : ''}${departureMinutes}`;

    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => handleBooking(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.logo} />
          <View style={styles.detailsContainer}>
            <Text style={styles.airlineName}>{item.airline}</Text>
            <Text style={styles.intervalText}>{`${arrivedTime} to ${departureTime}`}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.stopsText}>{item.numberOfStops} Stops</Text>
            <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const handleBooking = (flight) => {
  //   // Handle booking logic here
  //   console.log('Booking flight:', flight);
  // };

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  flatList: {
    backgroundColor: '#2cd3db',
  },
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  logo: {
    width: '10%', // Take 50% of the width
    aspectRatio: 1, // Maintain aspect ratio
    marginRight: 15,
  },
  airlineName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginTop:5,
    marginBottom: 5,
  },
  intervalText: {
    fontSize: 14,
    color: '#666',
    marginTop:5,
    marginBottom: 5,
  },
  priceText:{
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  }
});

export default FlightResultScreen;
