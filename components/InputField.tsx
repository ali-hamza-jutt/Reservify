import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet } from 'react-native';
import cityToIataMapping from '../data/cityToIataMapping'; // Adjust the path as necessary

const InputField1: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestedCities, setSuggestedCities] = useState<string[]>([]);

  const handleSearchInput = (text: string) => {
    setSearchInput(text);

    // Filter cities based on user input
    if (text.trim() !== '') {
      const filteredCities = Object.keys(cityToIataMapping).filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestedCities(filteredCities);
    } else {
      setSuggestedCities([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearchInput}
        value={searchInput}
        placeholder="Enter city name"
      />
      <FlatList
        style={styles.suggestions}
        data={suggestedCities}
        renderItem={({ item }) => <Text style={styles.suggestionItem}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  suggestions: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default InputField1;
