import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FlightSearch = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fromId: '',
    toId: '',
    departureDate: '',
    adults: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Hailo');
    const { fromId, toId, departureDate, adults } = formData;
    if (!fromId || !toId || !departureDate || !adults) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    console.log('Form:', formData);
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
});

export default FlightSearch;
