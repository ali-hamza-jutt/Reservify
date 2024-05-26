import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import useHotelHook from '../hooks/useHotelHook';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function ExploreListView({ dataList, category }) {
  const [loading, setLoading] = useState(true);
  const [updatedDataList, setUpdatedDataList] = useState([]);
  const listRef = useRef(null);
  const router = useRouter();
  const { fetchImages, images } = useHotelHook();
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

  useEffect(() => {
    const fetchData = async () => {
      console.log("reloadlisting");
      setLoading(true);
      await fetchImages();
      setLoading(false);
    };
    fetchData();
  }, [category]);

  useEffect(() => {

    const updateDataListWithImages = async () => {
      setLoading(true);
      const newDataList = await dataList.map((item, index) => ({
        hotel_id: item.hotel_id,
        hotel_name: item.hotel_name,
        review_score: item.review_score,
        country_trans: item.country_trans,
        address: item.address,
        image_url: images[index] ? images[index].image_url : []
      }));
      setUpdatedDataList(newDataList);
      // setLoading(false);
    };

    if (!loading && images.length > 0) {
      updateDataListWithImages();
      setLoading(false);
    }
  }, [dataList, loading, images]);

  const listItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => router.push({
      pathname: `/listing/${index}`,
      params: { hotelData: JSON.stringify(item) }
    })}>
      <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.image_url && item.image_url.length > 0 ? item.image_url[0] : 'default_image_url', // Default URL
            }}
          />

          <View style={styles.textDescription}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>{item.hotel_name || 'Unknown Hotel'}</Text>
              <View style={{ flexDirection: 'row', gap: 7, justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>{item.review_score || ''}</Text>
                <AntDesign name="star" size={24} color="#EDC616" />
              </View>
            </View>

            <Text style={{ fontFamily: 'PoppinsRegular', }}>{item.country_trans || 'Unknown Country'}</Text>
            <Text style={{ fontFamily: 'PoppinsRegular', }}>{item.address || 'Unknown Address'}</Text>
          </View>
        </View>
      </Animated.View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieView style={styles.lottieView} source={require('../assets/lottie/loading.json')} autoPlay loop />
      ) : (
        <FlatList
          data={updatedDataList}
          ref={listRef}
          renderItem={listItem}
          keyExtractor={(item, index) => item.hotel_id ? item.hotel_id.toString() : index.toString()} // Ensure unique key for each item
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listing: {
    padding: 16,
    // backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
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
    elevation: 10, // For Android shadow
    borderWidth: 1, // Adding border for glossy effect
    borderColor: 'rgba(255, 255, 255 , 0.5)', // White border with transparency
    overflow: 'hidden', // Ensure content respects the border radius
  },
  lottieView: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    backgroundColor: '#DEE5F0',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    overflow: 'hidden',

  },
  textDescription: {
    padding: 10,
    // flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
