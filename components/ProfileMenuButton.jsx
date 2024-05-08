import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProfileMenuButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        elevation: 3,
    },
    text: {
        color: '#102C57',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});

export default ProfileMenuButton;
