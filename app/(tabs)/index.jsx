import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import { Ionicons } from '@expo/vector-icons'
import HotelListView from '../../components/HotelListView'

import hotels from '../../assets/hotel'
import FlightsListView from '../../components/FlightsListView'


export default function index() {

  const categoryComponents = {
    Hotels: HotelListView,
    Flights: FlightsListView,
    // Hiking: HikingListView,
    // Restaurants: RestaurantListView,
    // Cars: CarListView,
    // Shopping: ShoppingListView,
    // Events: EventListView,
    // Movies: MovieListView,
    // Beaches: BeachListView
  }

  const [selectedCategory, setSelectedCategory] = useState('Hotels')
  const SelectedComponent = categoryComponents[selectedCategory]
  console.log(selectedCategory)

  const onDataChanged = (category) => {
    setSelectedCategory(category)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ExploreHeader onCategoryChanged={onDataChanged} />
        </View>

        <View style={styles.listing}>
        {SelectedComponent ? (
            <SelectedComponent dataList={hotels} category={selectedCategory} />
          ) : (
            <Text>No component found for {selectedCategory}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flex: 1.5,
    // backgroundColor: 'brown',
    padding: 20,
  },
  listing: {
    flex: 6,
    backgroundColor: '#FAFCFD',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    }
  }
})