import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditProfileHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
});