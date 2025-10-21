import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface ProfileFieldProps {
    label: string;
    value: string;
    placeholder?: string;
    editable?: boolean;
}

export default function ProfileField({ label, value, placeholder, editable = true }: ProfileFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder}
                editable={editable}
                placeholderTextColor="#999999"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        fontSize: 12.5,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 11,
        color: '#343434',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    placeholder: {
        color: 'gray',
    }
});