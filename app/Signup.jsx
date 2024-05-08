import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../components/CustomTextField';
import CustomButton from '../components/CustomButton';

export default function Signup() {
    const navigation = useNavigation();

    const [submit, setSubmit] = useState(false);
    const [userData, setUserData] = useState({
        Username: "",
        phone: "",
        email: "",
        password: "",
        cnfPassword: ""
    });

    function handleChange(name, text) {
        if (name === "cnfPassword" && text !== userData.password) {
            setSubmit(false);
        } else {
            setSubmit(true);
        }
        setUserData({
            ...userData,
            [name]: text
        });
    }

    function handleSubmit() {
        if (userData.Username.trim() === "" || userData.phone.trim() === "" || userData.email.trim() === "" || userData.password.trim() === "" || userData.cnfPassword.trim() === "") {
            Alert.alert("Invalid Form", "Please fill in all fields");
            return;
        } else if (submit) {//checks if pass == cnfpass
            console.log(userData);
            navigation.navigate('Login')
        } else {
            Alert.alert("");
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/sign up.png')}
                    />
                </View>

                <View style={styles.middleSection}>
                    <Text style={styles.text}>Register</Text>
                    <Text style={{ fontSize: 17 }}>Please Register to continue.</Text>
                    <View style={styles.inputSection}>
                        <CustomTextField
                            placeholder={'Username'}
                            name={'Username'}
                            value={userData.Username}
                            onChangeText={(text) => handleChange("Username", text)}
                            keyboardType="default"
                            icon={"person-circle-outline"}
                        />
                        <CustomTextField
                            placeholder={'Phone number'}
                            name={'phone'}
                            value={userData.phone}
                            onChangeText={(text) => handleChange("cnfPassword", text)}
                            keyboardType="default"
                            icon={"call"}
                        />
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
                        <CustomTextField
                            placeholder={'Confirm Password'}
                            name={'cnfPassword'}
                            value={userData.cnfPassword}
                            onChangeText={(text) => handleChange("cnfPassword", text)}
                            keyboardType="default"
                            icon={"lock-closed"}
                        />
                    </View>
                    <View style={styles.bottomSection}>
                        <CustomButton
                            title={'Sign up'}
                            color={'#102C57'}
                            textColor={'#FEFAF6'}
                            onPress={handleSubmit}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontWeight: '200', }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontSize: 17, textDecorationLine: 'underline' }}>Login</Text>
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
        flexGrow: 1,
        backgroundColor: '#FEFAF6',
    },
    header: {
        gap: 30,
        alignItems: 'center',
    },
    tinyLogo: {
        marginTop: '20%',
        width: 280,
        height: 260,
    },
    text: {
        fontSize: 30,
        fontWeight: '400',
    },
    middleSection: {
        padding: 10,
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
