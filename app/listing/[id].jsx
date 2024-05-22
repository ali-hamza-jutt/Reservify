import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import LottieView from 'lottie-react-native';
import hotels from '../../assets/hotel'
import useHotelHook from '../../hooks/useHotelHook';


export default function Page() {
    const { hotelData } = useLocalSearchParams();
    const { addWishList,removeWishList,isHotelInWishlist } = useHotelHook(); // Ensure useHotelHook is called as a function
    const router = useRouter();
    const [loaded] = useFonts({
        PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    });

    const listingData = JSON.parse(hotelData);
    console.log('listingData', listingData);

    const heartRef = useRef(null);
    const [fav, setFav] = useState(false);

    useEffect(() => {
        const checkWishlistStatus = async () => {
          const isInWishlist = await isHotelInWishlist(listingData.hotel_id, "userId1");
          setFav(isInWishlist);
          if (isInWishlist) {
            console.log("add")
            heartRef?.current?.play(144, 144); // Ensure the heart is filled if the hotel is in the wishlist
          }
          else{
            console.log("rem")
            heartRef?.current?.reset();
          }
        };
        checkWishlistStatus();
      }, [heartRef]);

    const handleLike = () => {
        if (fav) {
            heartRef?.current?.reset();
            removeWishList(listingData.hotel_id,"userId1")
        } else {
            heartRef?.current?.play(30, 144);
            addWishList(listingData,"userId1");
            console.log('liked');
        }
        setFav(!fav);
    };

    const [topImageSource, setTopImageSource] = useState({ uri: listingData.image_url[0] });
    const [bottomImageSource, setBottomImageSource] = useState(
        listingData.image_url.slice(1, 4).map((url) => ({ uri: url }))
    );

    const handleImagePress = (imageSource, index) => {
        setTopImageSource(imageSource);
        setBottomImageSource((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = topImageSource;
            return updatedImages;
        });
    };
    return (
        // <ScrollView>
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar />

            <View style={styles.backButton}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={topImageSource}
                    style={styles.image}
                />

                <View style={styles.listContainer}>
                    {bottomImageSource.map((imageSource, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => handleImagePress(imageSource, index)}>
                            <Image
                                source={imageSource}
                                style={styles.listImages}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
            <ScrollView style={styles.bottom}>
                <View>
                    <Text style={{ fontSize: 30, fontFamily: "PoppinsSemiBold", fontWeight: '400', marginBottom: 10 }}>{listingData.hotel_name}</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonSection}>
                <Pressable style={styles.icon} onPress={handleLike}>
                    <LottieView ref={heartRef} style={{ flex: 1, borderColor: 'black' }} loop={false} source={require('../../assets/lottie/heart.json')} />
                </Pressable>

                <CustomButton
                    title={'Book Now'}
                    color={'#102C57'}
                    textColor={'#FEFAF6'}
                    onPress={() => {
                        console.log("pressed")
                    }}
                />
            </View>

        </View>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        // backgroundColor: 'black'
    },
    backButton: {
        position: 'absolute',
        top: 45,
        left: 7,
        zIndex: 1,
        // marginTop: -20,
        zIndex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    imageContainer: {
        flex: 2,
        marginTop: 10,
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    image: {
        flex: 2,
        width: '94%',
        height: '70%',
        borderRadius: 30,
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'aliceblue',
        gap: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    listImages: {
        width: 115,
        height: 115,
        borderRadius: 18,
    },
    bottom: {
        flex: 1.4,
        padding: 20,
        // justifyContent: 'space-between',
        backgroundColor: '#F5EDF6'
    },
    descriptionText: {
        fontSize: 18,
        lineHeight: 24,
        color: 'black',
        fontFamily: "PoppinsRegular",
    },
    buttonSection: {
        // backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 25,
    },
    icon: {
        borderRadius: 50,
        // shadowRadius: 50,
        height: 55,
        aspectRatio: 1,
        borderColor: 'rgba(255, 255, 255 , 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Transparent white background for glossy effect
        shadowColor: 'grey',
        // shadowOpacity: 1,
        shadowRadius: 50,
        elevation: 0, // For Android shadow
        borderWidth: 1, // Adding border for glossy effect
        overflow: 'hidden', // Ensure content respects the border radius
    }



});
