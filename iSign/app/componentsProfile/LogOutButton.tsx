import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native';

export default function LogOutButton() {
    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: () => {
                        // Handle logout logic here
                        Alert.alert('Logged out successfully');
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                  // Make the container take up available space
        justifyContent: 'center', // Vertically center the button
        alignItems: 'center',     // Horizontally center the button
    },
    button: {
        width: 150,
        backgroundColor: '#343434',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 10,             // Increase font size for better readability
        fontWeight: '500',
    },
});
