import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View style={styles.container}>
      <Link href={'/(modals)/description'}>description</Link>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
})