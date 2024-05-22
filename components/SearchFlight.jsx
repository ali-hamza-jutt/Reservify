import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import cityToIataMapping
import cityToIataMapping from '../data/cityToIataMapping';

const FlightSearch = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fromId: '',
    toId: '',
    departureDate: '',
    adults: ''
  });

  // State for suggestions
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleChange = (name, value) => {
    // Update form data
    setFormData({ ...formData, [name]: value });

    // Get suggestions based on current input value
    const suggestions = value.trim() !== '' ? Object.keys(cityToIataMapping).filter(city =>
      city.toLowerCase().startsWith(value.toLowerCase())
    ) : [];

    // Update suggestions based on input field
    if (name === 'fromId') {
      setFromSuggestions(suggestions);
    } else if (name === 'toId') {
      setToSuggestions(suggestions);
    }
  };

  const handleSelectSuggestion = (name, suggestion) => {
    // Update form data with selected suggestion
    setFormData({ ...formData, [name]: suggestion });

    // Close suggestion list
    if (name === 'fromId') {
      setFromSuggestions([]);
    } else if (name === 'toId') {
      setToSuggestions([]);
    }
  };

  const handleSubmit = () => {
    const { fromId, toId, departureDate, adults } = formData;
    if (!fromId || !toId || !departureDate || !adults) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Map user input to corresponding IATA code
    const fromIata = cityToIataMapping[fromId] || '';
    const toIata = cityToIataMapping[toId] || '';

    // Navigate to flight result screen with form data
    
    navigation.navigate('FlightResultScreen', { formData: { fromId: fromIata, toId: toIata, departureDate, adults } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>From:</Text>
      <TextInput
        style={styles.input}
        value={formData.fromId}
        onChangeText={(text) => handleChange('fromId', text)}
        placeholder="Enter from (e.g., BOM.AIRPORT)"
      />
      {/* Suggestions for "From" field */}
      {fromSuggestions.length > 0 && fromSuggestions.map((suggestion, index) => (
        <Text key={index} onPress={() => handleSelectSuggestion('fromId', suggestion)}>{suggestion}</Text>
      ))}

      <Text style={styles.label}>To:</Text>
      <TextInput
        style={styles.input}
        value={formData.toId}
        onChangeText={(text) => handleChange('toId', text)}
        placeholder="Enter destination (e.g., DEL.AIRPORT)"
      />
      {/* Suggestions for "To" field */}
      {toSuggestions.length > 0 && toSuggestions.map((suggestion, index) => (
        <Text key={index} onPress={() => handleSelectSuggestion('toId', suggestion)}>{suggestion}</Text>
      ))}

      <Text style={styles.label}>Departure Date:</Text>
      <TextInput
        style={styles.input}
        value={formData.departureDate}
        onChangeText={(text) => handleChange('departureDate', text)}
        placeholder="Enter departure date (YYYY-MM-DD)"
      />

      <Text style={styles.label}>Adults:</Text>
      <TextInput
        style={styles.input}
        value={formData.adults}
        onChangeText={(text) => handleChange('adults', text)}
        placeholder="No of adults"
        keyboardType="numeric"
      />

      <Button title="Search Flights" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default FlightSearch;
