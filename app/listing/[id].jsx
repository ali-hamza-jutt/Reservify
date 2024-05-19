import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import LottieView from 'lottie-react-native';
import { useLocalSearchParams } from 'expo-router'
import hotels from '../../assets/hotel'


export default function Page() {
    const { id } = useLocalSearchParams()
    console.log(id)
    const listingData = hotels.find((item) => item.id == id) 
    const router = useRouter()
    const [loaded] = useFonts({
        PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    });

    const heartRef = useRef(null);
    const [fav, setFav] = useState(false)
    function handleLike() {
        if (fav)
            heartRef?.current?.reset()
        else
            heartRef?.current?.play(30, 144)

        setFav(!fav)
    }

    const [topImageSource, setTopImageSource] = useState({ uri: listingData.images[0] });

    const [bottomImageSource, setBottomImageSource] = useState([
        { uri: listingData.images[1] },
        { uri: listingData.images[2] },
        { uri: listingData.images[3] },
    ]);

    const handleImagePress = (imageSource, index) => {
        setTopImageSource(imageSource);
        setBottomImageSource(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = topImageSource;
            return updatedImages;
        });

        // console.log(bottomImageSource)
    };

    return (
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
            <View style={styles.bottom}>
                <View>
                    <Text style={{ fontSize: 40, fontFamily: "PoppinsSemiBold", fontWeight: '400', marginBottom: 10 }}>Aura House</Text>
                    <Text style={styles.descriptionText}>Aura house is a beautiful and unique eco-bamboo house built on the west bank of the Ayung River, facing east to admire the sunrise.</Text>
                </View>

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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
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
        justifyContent: 'space-between'
    },
    descriptionText: {
        fontSize: 18,
        lineHeight: 24,
        color: 'black',
        fontFamily: "PoppinsRegular",
    },
    buttonSection: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        borderRadius: 50,
        height: 55,
        aspectRatio: 1,
        borderColor: '#314E7A',
        borderWidth: 2,
    }



});
