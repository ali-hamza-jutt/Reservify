import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert,ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../components/CustomTextField';
import CustomButton from '../components/CustomButton';

import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
    const navigation = useNavigation();

    const [submit, setSubmit] = useState(false)
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    function handleChange(name, text) {
        setSubmit(true)
        setUserData({
            ...userData,
            [name]: text
        });
    }

    const handleSubmit = async () => {
        if (userData.email.trim() === "" || userData.password.trim() === "") {
            Alert.alert("Invalid Form", "Please fill in all fields");
            return;
        }
        console.log(userData);
        await signInWithEmailAndPassword(auth,userData.email, userData.password)
        .then((userCredential) => {
          console.log("user data,", userCredential.user.uid);
          navigation.navigate('(tabs)')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Invalid credentials", "Try again");
          console.log(error);
        });
        
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/login.png')}
                    />
                </View>

                <View style={styles.middleSection}>
                    <Text style={styles.text}>Login</Text>
                    <Text style={{ fontSize: 17 }}>Please Login to continue.</Text>
                    <View style={styles.inputSection}>
                        <CustomTextField
                            placeholder={'Email'}
                            name={'email'}
                            value={userData.email}
                            onChangeText={(text) => handleChange("email", text)}
                            keyboardType="default"
                            icon={"mail-outline"}
                        />
                        <CustomTextField
                            placeholder={'Password'}
                            name={'password'}
                            value={userData.password}
                            onChangeText={(text) => handleChange("password", text)}
                            keyboardType="default"
                            icon={"lock-closed"}
                        />
                    </View>
                    <View style={styles.bottomSection}>
                        <CustomButton
                            title={'Login'}
                            color={'#102C57'}
                            textColor={'#FEFAF6'}
                            onPress={handleSubmit}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: '200', }}>Doesn't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={{ fontSize: 17, textDecorationLine: 'underline' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFAF6',
    },
    header: {
        gap: 30,
        alignItems: 'center',
    },
    tinyLogo: {
        marginTop: '30%',
        width: 300,
        height: 300,
    },
    text: {
        fontSize: 34,
        fontWeight: '400',
    },
    middleSection: {
        padding: 20,
        paddingHorizontal: 40,
    },
    inputSection: {
        marginTop: 18,
    },
    bottomSection: {
        marginTop: 18,
        gap: 10,
        alignItems: 'center',
    }
});
