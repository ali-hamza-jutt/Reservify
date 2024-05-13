import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const PersonnelInformation = () => {
  // Static data for personnel information
  const data = [
    { key: 'Name', value: 'Ali Hamza' },
    { key: 'Birthday', value: 'December 7, 2002' },
    { key: 'Address', value: 'xyz street abc city' },
    { key: 'Phone Number', value: '03086227654' },
    { key: 'Email', value: 'alihamza16jutt@gmail.com' },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          {item.key ? <Text style={styles.itemHeading}>{item.key}</Text> : null}
          {item.value ? <Text style={styles.itemInfo}>{item.value}</Text> : null}
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.separator} /> {/* Horizontal line */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemHeading: {
    fontSize: 16,
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  itemInfo: {
    color: '#8e8c89',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  editButton: {
    backgroundColor: 'transparent',
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PersonnelInformation;

