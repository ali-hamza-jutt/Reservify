import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router'

// Import cityToIataMapping
import cityToIataMapping from '../../assets/data/cityToIataMapping';
import CustomButton from '../../components/CustomButton';
import CustomTextField from '../../components/CustomTextField';

const FlightsSearch = () => {
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
      <Stack.Screen options={{
        presentation: 'transparentModal',
        headerShown: false
      }} />
      <View style={styles.card}>
        <CustomTextField
          style={styles.input}
          value={formData.fromId}
          onChangeText={(text) => handleChange('fromId', text)}
          placeholder="Enter from (e.g., BOM.AIRPORT)"
        />
        {fromSuggestions.length > 0 && fromSuggestions.map((suggestion, index) => (
          <Text key={index} onPress={() => handleSelectSuggestion('fromId', suggestion)}>{suggestion}</Text>
        ))}
        <CustomTextField
          style={styles.input}
          value={formData.toId}
          onChangeText={(text) => handleChange('toId', text)}
          placeholder="Enter destination (e.g., DEL.AIRPORT)"
        />
        {/* Suggestions for "To" field */}
        {toSuggestions.length > 0 && toSuggestions.map((suggestion, index) => (
          <Text key={index} onPress={() => handleSelectSuggestion('toId', suggestion)}>{suggestion}</Text>
        ))}

        <CustomTextField
          style={styles.input}
          value={formData.departureDate}
          onChangeText={(text) => handleChange('departureDate', text)}
          placeholder="Enter departure date (YYYY-MM-DD)"
        />

        <CustomTextField
          style={styles.input}
          value={formData.adults}
          onChangeText={(text) => handleChange('adults', text)}
          placeholder="No of adults"
          keyboardType="numeric"
        />

        <CustomButton color={'#102C57'} textColor={'#FEFAF6'} title="Search Flights" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
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
  card: {
    backgroundColor: 'aliceblue',
    width: '100%',
    height: '50%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});

export default FlightsSearch;
