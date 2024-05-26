import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native'; // Import LottieView
import { useRouter } from 'expo-router';

import useHotelHook from '../hooks/useHotelHook'; // Import your custom hook

const { width } = Dimensions.get('window');

const HotelWishlist = () => {
  const navigation = useNavigation();
  const { getWishLists, favorite } = useHotelHook(); // Destructure the hook
  const router = useRouter();

  const [loading, setLoading] = useState(true); // State to manage loading animation
  const [wishlistData, setWishlistData] = useState([]); // State to store wishlist data

  useEffect(() => {
    // Fetch wishlist data
    const fetchWishlistData = async () => {
      await getWishLists("userId1"); // Assuming userId is available in your scope
      setLoading(false); // After fetching, stop loading
    };

    fetchWishlistData();
  }, []);

  useEffect(() => {
    if (favorite) {
      setWishlistData(Object.values(favorite));
    }
  }, [favorite]);

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieView style={{ flex: 1 }} source={require('../assets/lottie/loading.json')} autoPlay loop />
      ) : (
        // Map through the wishlist data and render hotel cards
        wishlistData.map((item) => (
          <TouchableOpacity style={styles.card} key={item.hotel_id}
            onPress={() => router.push({
              pathname: `/listing/${item.hotel_id}`,
              params: { hotelData: JSON.stringify(item) }
            })}>
            <Image style={styles.image} source={{ uri: item.image_url[0] }} />
            <Text style={styles.type}>{item.hotel_name}</Text>
            <Text style={styles.cost}>Review Score: {item.review_score}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: (width - 40) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cost: {
    fontSize: 14,
    color: '#666',
  },
});

export default HotelWishlist;
