import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import the cityToIataMapping data
import cityToIataMapping from '../data/cityToIataMapping';

const FlightSearch = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fromId: '',
    toId: '',
    departureDate: '',
    adults: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [selectedField, setSelectedField] = useState('');

  // Function to handle changes in the input fields
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setSelectedField(name);

    // Filter the cityToIataMapping based on user input
    const matchingCities = Object.keys(cityToIataMapping).filter(city =>
      city.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(matchingCities);
  };

  // Function to handle selection from the suggestions
  const handleSelectSuggestion = (city) => {
    setFormData({ ...formData, [selectedField]: cityToIataMapping[city] });
    setSuggestions([]);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const { fromId, toId, departureDate, adults } = formData;
    if (!fromId || !toId || !departureDate || !adults) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    navigation.navigate('FlightResultScreen', { formData });
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
      {/* Render suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.label}>To:</Text>
      <TextInput
        style={styles.input}
        value={formData.toId}
        onChangeText={(text) => handleChange('toId', text)}
        placeholder="Enter destination (e.g., DEL.AIRPORT)"
      />

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
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FlightSearch;
