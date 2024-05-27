import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import useHotelHook from '../hooks/useHotelHook';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

class ExploreListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      updatedDataList: [],
      fontsLoaded: false,
    };
    this.listRef = React.createRef();
  }

  async componentDidMount() {
    await this.loadFonts();
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchData();
    }

    if (!this.state.loading && this.props.images.length > 0 && prevProps.dataList !== this.props.dataList) {
      this.updateDataListWithImages();
    }
  }

  loadFonts = async () => {
    await Font.loadAsync({
      'PoppinsRegular': require('../assets/fonts/Poppins-Regular.ttf'),
      'PoppinsSemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
    this.setState({ fontsLoaded: true });
    await SplashScreen.hideAsync();
  };

  fetchData = async () => {
    console.log("reloadlisting");
    this.setState({ loading: true });
    await this.props.fetchImages();
    this.setState({ loading: false });
  };

  updateDataListWithImages = () => {
    const newDataList = this.props.dataList.map((item, index) => ({
      hotel_id: item.hotel_id,
      hotel_name: item.hotel_name,
      review_score: item.review_score,
      country_trans: item.country_trans,
      address: item.address,
      image_url: this.props.images[index] ? this.props.images[index].image_url : []
    }));
    this.setState({ updatedDataList: newDataList });
  };

  listItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this.props.router.push({
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <LottieView style={styles.lottieView} source={require('../assets/lottie/loading.json')} autoPlay loop />
        ) : (
          <FlatList
            data={this.state.updatedDataList}
            ref={this.listRef}
            renderItem={this.listItem}
            keyExtractor={(item, index) => item.hotel_id ? item.hotel_id.toString() : index.toString()} // Ensure unique key for each item
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listing: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255 , 0.5)',
    overflow: 'hidden',
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
    elevation: 5,
    overflow: 'hidden',
  },
  textDescription: {
    padding: 10,
    justifyContent: 'space-between'
  }
});

// Wrapper functional component
const ExploreListViewWrapper = (props) => {
  const router = useRouter();
  const { fetchImages, images } = useHotelHook();

  return (
    <ExploreListView
      {...props}
      router={router}
      fetchImages={fetchImages}
      images={images}
    />
  );
};

export default ExploreListViewWrapper;
