import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DictionaryCardProps {
    title: string;
    description: string;
    imageSource?: any; // For now using placeholder
    onArrowPress: () => void;
    onFavoritePress?: (isFavorited: boolean) => void;
    initialFavorited?: boolean;
}

export default function DictionaryCard({ 
    title, 
    description, 
    imageSource, 
    onArrowPress, 
    onFavoritePress,
    initialFavorited = false 
}: DictionaryCardProps) {
    const [isFavorited, setIsFavorited] = useState(initialFavorited);

    const handleFavoritePress = () => {
        const newFavoritedState = !isFavorited;
        setIsFavorited(newFavoritedState);
        onFavoritePress?.(newFavoritedState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            
            <View style={styles.imageContainer}>
                {imageSource ? (
                    <Image source={imageSource} style={styles.image} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>Image Placeholder</Text>
                    </View>
                )}
            </View>

            <View style={styles.bottomActions}>
                <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
                    <Ionicons 
                        name={isFavorited ? "star" : "star-outline"} 
                        size={24} 
                        color={isFavorited ? "#343434" : "#666666"} 
                    />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={onArrowPress} style={styles.arrowButton}>
                    <Ionicons name="chevron-forward" size={20} color="#343434" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343434',
        textAlign: 'center',
        marginBottom: 1,
    },
    description: {
        fontSize: 11,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 12,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: -10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: 200,
        height: 200,
        backgroundColor: '#e5e5e5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderStyle: 'dashed',
    },
    placeholderText: {
        color: '#999999',
        fontSize: 16,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    favoriteButton: {
        padding: 4,
    },
    arrowButton: {
        padding: 4,
    },
});