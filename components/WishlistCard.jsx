import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    accommodationType: 'Room',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: '$100 per night'
  },
  {
    id: '2',
    accommodationType: 'Room',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: '$100 per night'
  },
  {
    id: '3',
    accommodationType: 'Room',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: '$100 per night'
  },
  {
    id: '4',
    accommodationType: 'Room',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: '$100 per night'
  }
];

const WishlistCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Link href={'listing/1'} key={item.id} asChild>
          <TouchableOpacity style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: item.image }}
            />
            <Text style={styles.type}>{item.accommodationType}</Text>
            <Text style={styles.cost}>{item.cost}</Text>
          </TouchableOpacity>
        </Link>
      ))}
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

export default WishlistCard;
