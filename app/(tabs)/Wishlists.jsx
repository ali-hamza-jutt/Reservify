import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HotelWishlist from '../../components/HotelsWishlist'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Ionicons, MaterialIcons, MaterialCommunityIcons, Fontisto, FontAwesome5 } from '@expo/vector-icons'
import FlightWishlist from '../../components/FlightWishlist';

const categories = [
  {
    name: 'Hotels',
    icon: 'bed',
    iconType: FontAwesome5
  },
  {
    name: 'Flights',
    icon: 'plane',
    iconType: Fontisto
  },
  {
    name: 'Hiking',
    icon: 'hiking',
    iconType: MaterialIcons
  },
  {
    name: 'Restaurants',
    icon: 'restaurant',
    iconType: MaterialIcons
  },
  {
    name: 'Cars',
    icon: 'directions-car',
    iconType: MaterialIcons
  },
  {
    name: 'Shopping',
    icon: 'shopping-cart',
    iconType: MaterialIcons
  },
  {
    name: 'Events',
    icon: 'event',
    iconType: MaterialIcons
  },
  {
    name: 'Movies',
    icon: 'movie',
    iconType: MaterialIcons
  },
  {
    name: 'Beaches',
    icon: 'beach',
    iconType: MaterialCommunityIcons
  },
  // Add more categories as needed
];

export default Wishlists = () => {
  const categoryComponents = {
    Hotels: HotelWishlist,
    Flights: FlightWishlist,
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

  const onDataChanged = (category) => {
    setSelectedCategory(category)
  }
  const itemsRef = useRef([]);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
      'PoppinsSemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    });
    setFontsLoaded(true);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    loadFonts();
  }, []);

  function handleActiveTab(index) {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onDataChanged(categories[index].name);
  }

  return (

    <SafeAreaView>
      <View style={styles.container}>
        <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 30, marginVertical: 15, paddingHorizontal: 20, }}>Wishlist</Text>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 16,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
              onPress={() => handleActiveTab(index)}>
              <item.iconType
                name={item.icon}
                size={22}
                color={activeIndex === index ? '#102C57' : 'grey'}
              />
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>


        <View style={styles.middleListing}>
          {SelectedComponent ? (
            <SelectedComponent category={selectedCategory} />
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
    paddingVertical: 20,
  },
  scrollContainer: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // margin: 7,
    // backgroundColor: 'red'
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: 'grey',
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#FFB900',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  middleListing: {
    marginVertical: 15,
  }
})