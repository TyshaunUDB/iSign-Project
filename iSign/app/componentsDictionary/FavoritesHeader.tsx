import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FavoritesHeaderProps {
    onPress: () => void;
}

export default function FavoritesHeader({ onPress }: FavoritesHeaderProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Ionicons name="star" size={24} color="#343434" style={styles.starIcon} />
            <Text style={styles.favoritesText}>Favorites</Text>
            <Ionicons name="arrow-forward" size={20} color="#343434" style={styles.arrowIcon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    starIcon: {
        marginRight: 12,
    },
    favoritesText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#343434',
    },
    arrowIcon: {
        marginLeft: 8,
    },
});