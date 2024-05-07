import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTextField = ({ placeholder, onChangeText, value, keyboardType, name, icon }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(name === 'password' || name === 'cnfPassword');

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <View style={styles.inputContainer}>
            {icon && <Ionicons name={icon} size={24} color="#999" style={styles.icon} />}
            <TextInput
                style={styles.input}
                name={name}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry}
            />
            {(name === 'password' || name === 'cnfPassword') && (
                <TouchableOpacity onPress={toggleSecureEntry}>
                    <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="#999" style={styles.icon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 17,
        backgroundColor: '#ECECEC',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginRight: 10,
    },
});

export default CustomTextField;
