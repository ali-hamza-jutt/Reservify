import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CustomTextField from '../../components/CustomTextField'

export default function HotelsSearch() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                presentation: 'transparentModal',
                headerShown: false
            }} />

            <View style={styles.card}>
                <Text style={{ backgroundColor: 'red' }}>hotelSearch</Text>
                <CustomTextField />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    card: {
        backgroundColor: 'grey',
        width: '100%',
        height: '30%',
        padding: 20,
    }
})