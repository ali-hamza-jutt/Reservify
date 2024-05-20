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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleBooking(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.logo} />
        <View style={styles.detailsContainer}>
          <Text style={styles.airlineName}>{item.airline}</Text>
          <Text>Flight Number: {item.flightNumber}</Text>
          <Text>Duration: {formatDuration(item.duration)}</Text>
          <Text>Cabin Class: {item.cabinClassName}</Text>
          <Text>Arrival Time: {item.arrivedAt}</Text>
          <Text>Number of Stops: {item.numberOfStops}</Text>
          <Text>Price: ${item.price}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBooking = (flight) => {
    // Handle booking logic here
    console.log('Booking flight:', flight);
  };

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
    backgroundColor: '#606060',
    margin:10
  },
  flatList: {
    backgroundColor: '#f9f9f9',
  },
  cardContainer: {
    flexDirection: 'row',
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
    width: 100, // Set the width
    height: 100, // Set the height
    marginRight: 15,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  airlineName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: '#FFB900',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FlightResultScreen;
