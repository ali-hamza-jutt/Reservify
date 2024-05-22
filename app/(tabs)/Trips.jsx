import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlightSearch from '../../components/FlightSearch';
import HotelSearch from '../../components/HotelSearch';
import SearchFlight from '../../components/SearchFlight';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField1 from '../../components/InputField'


export default function Trips() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <SearchFlight/>
        {/* <InputField1/> */}

        {/* <HotelSearch/> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
});
