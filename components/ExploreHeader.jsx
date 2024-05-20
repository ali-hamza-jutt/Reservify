import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Link } from 'expo-router';

const categories = [
  {
    name: 'Hotels',
    icon: 'bed',
    iconType: MaterialIcons
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

export default function ExploreHeader({ onCategoryChanged }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'PoppinsRegular': require('../assets/fonts/Poppins-Regular.ttf'),
      'PoppinsSemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
    setFontsLoaded(true);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const itemsRef = useRef([]);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleActiveTab(index) {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onCategoryChanged(categories[index].name);
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      {/* <View style={styles.textHeader}>
        <Text style={{ fontSize: 30, fontFamily: 'PoppinsSemiBold' }}>Reservify</Text>
        <TouchableOpacity onPress={() => console.log("settings")}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View> */}

      <View style={styles.actionRow}>
        <Link href={'/(modals)/hotelSearch'} asChild>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name='search' size={24} color={'black'}/>
            <View>
              <Text style={{fontFamily: 'PoppinsSemiBold', fontSize: 15,}}>Where to?</Text>
              <Text style={{ fontFamily: 'PoppinsRegular', color: 'grey' }}>Anywhere any week</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>


      <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleActiveTab(index)}
            ref={(el) => (itemsRef.current[index] = el)}
            key={index}
            style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}
          >
            <item.iconType
              name={item.icon}
              size={22}
              color={activeIndex === index ? '#102C57' : 'grey'}
            />
            <Text style={activeIndex === index ? styles.categoryTextActive : styles.catoryText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 30,
    gap: 20,
    // backgroundColor: 'black',
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 170,
  },
  actionRow:{
    paddingHorizontal: 20,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 3,
    paddingHorizontal: 10
    // elevation: 1,
    // shadowColor: 'black',
    // shadowOpacity: 0.8,
    // shadowRadius: 8,
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // }
  },
  scrollContainer: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginb: 7,
    // backgroundColor: 'red'
  },
  catoryText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'PoppinsRegular',
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#102C57',
    fontFamily: 'PoppinsRegular',
  },
  categoryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: '#FFB900',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    }
  },
  categoryBtnActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFB900',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: '#FFB900',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    }
  },
});
