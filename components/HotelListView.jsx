import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';


export default function HotelListView({ dataList, category }) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const heartRefs = useRef([]);

  useEffect(() => {
    console.log("reloadlisting");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const handleLike = (index) => {
    const currentRef = heartRefs.current[index];
    if (currentRef) {
      if (currentRef.isFavorited) {
        currentRef.reset();
        currentRef.isFavorited = false;
      } else {
        currentRef.play(30, 144);
        currentRef.isFavorited = true;
      }
    }
  }

  const listItem = ({ item, index }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image
            style={styles.image}
            source={{
              uri: item.images[0],
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
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? [] : dataList}
        ref={listRef}
        renderItem={listItem}
        keyExtractor={(item) => item.id.toString()} // Ensure unique key for each item
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background for glossy effect
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
    borderWidth: 1, // Adding border for glossy effect
    borderColor: 'rgba(255, 255, 255, 0.5)', // White border with transparency
    overflow: 'hidden', // Ensure content respects the border radius
  },

  lottieView: {
    width: '100%',
    height: '100%',
  },
});
