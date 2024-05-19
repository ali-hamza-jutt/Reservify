import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WishlistCard from '../../components/WishlistCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wishlists = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.heading}>Wishlist</Text>
        <WishlistCard/>
      </View>
    </SafeAreaView>
  )
}

export default Wishlists

const styles = StyleSheet.create({
  heading:{
    fontSize:26,
    fontWeight:'bold',
    margin:10
    
  }
})