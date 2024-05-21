import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import useHotelHook from '../hooks/useHotelHook';

export default function ExploreListView({ dataList, category }) {
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  const heartRefs = useRef([]);
  const { fetchImages, images } = useHotelHook();

  useEffect(() => {
    const fetchData = async () => {
      console.log("reloadlisting");
      setLoading(true);
      await fetchImages();
      setLoading(false);
    };
    fetchData();

  }, [category]);

  console.log("data from hotels")
  
  if (item.image_url && item.image_url[0]) {
    dataList.map(item => {
      console.log('Hotel Name:', item.hotel_name);
      console.log('Rating:', item.review_score);
      console.log('Country:', item.country_trans);
      console.log('Address:', item.address);
      if (item.max_photo_url) {
        console.log('Photo URL:', item.max_photo_url);
      }
    });
  }


  const handleLike = (index) => {
    const currentRef = heartRefs.current[index];
    if (currentRef) {
      if (currentRef.isFavorited) {
        currentRef.reset();
        currentRef.isFavorited = false;
      } else {
        console.log("============================");
        currentRef.play(30, 144);
        currentRef.isFavorited = true;
      }
    }
  };

  const listItem = ({ item, index }) => (
    <Link href={`/listing/${item.id || index}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image
            style={styles.image}
            source={{
              uri: item.image_url && item.image_url[0] ? item.image_url[0] : 'default_image_url', // Default URL
            }}
          />
          <Pressable style={styles.icon} onPress={() => handleLike(index)}>
            <LottieView
              ref={(ref) => {
                heartRefs.current[index] = ref;
                if (ref) {
                  ref.isFavorited = false;
                }
              }}
              style={styles.lottieView}
              loop={false}
              source={require('../assets/lottie/heart.json')}
            />
          </Pressable>
        </Animated.View>
        <Text>{item.name || 'Unknown Hotel'}</Text>
        <Text>{item.rating || 'No Rating'}</Text>
        <Text>{item.country || 'Unknown Country'}</Text>
        <Text>{item.address || 'Unknown Address'}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? [] : images}
        ref={listRef}
        renderItem={listItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Ensure unique key for each item
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listing: {
    padding: 16,
    position: 'relative', // Ensure relative positioning for absolute children
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  icon: {
    width: 50, // Set appropriate width for the icon container
    height: 50, // Set appropriate height for the icon container
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Transparent white background for glossy effect
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
    borderWidth: 1, // Adding border for glossy effect
    // borderColor: 'rgba(255, 255, 255, 0.5)', // White border with transparency
    borderColor: 'rgba(255, 255, 255 , 0.5)', // White border with transparency
    overflow: 'hidden', // Ensure content respects the border radius
  },

  lottieView: {
    width: '100%',
    height: '100%',
  },
});
