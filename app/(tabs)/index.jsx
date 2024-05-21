import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ExploreHeader from '../../components/ExploreHeader'
import HotelListView from '../../components/HotelListView'
import localhotels from '../../assets/hotel'
import FlightsListView from '../../components/FlightsListView'
import useHotelHook from '../../hooks/useHotelHook'

export default function Index() {
    const categoryComponents = {
        Hotels: HotelListView,
        Flights: FlightsListView,
        // Hiking: HikingListView,
        // Restaurants: RestaurantListView,
        // Cars: CarListView,
        // Shopping: ShoppingListView,
        // Events: EventListView,
        // Movies: MovieListView,
        // Beaches: BeachListView
    }

    const [selectedCategory, setSelectedCategory] = useState('Hotels')
    const SelectedComponent = categoryComponents[selectedCategory]
    const { search, dummy, listing } = useHotelHook()

    const onDataChanged = (category) => {
        setSelectedCategory(category)
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("api data listing")
            await dummy()
            console.log("api data recieved")
            console.log(listing)
        };
        fetchData();
    }, [selectedCategory])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ExploreHeader onCategoryChanged={onDataChanged} />
                </View>
                <View style={styles.listing}>
                    {SelectedComponent ? (
                        <SelectedComponent dataList={listing} category={selectedCategory} />
                    ) : (
                        <Text>No component found for {selectedCategory}</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1.5,
        // backgroundColor: 'brown',
        padding: 20,
    },
    listing: {
        flex: 6,
        backgroundColor: '#FAFCFD',
    },
    card: {
        backgroundColor: '#fff',
        borderColor: 'grey',
        borderWidth: StyleSheet.hairlineWidth,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        }
    }
})
