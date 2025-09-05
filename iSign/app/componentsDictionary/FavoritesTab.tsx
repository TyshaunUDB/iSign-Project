import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import Navbar from '../(tabs)/navbar';
// Import components
import UserHeader from '../components/Userheader';
import SearchBar from '../components/SearchBar';

export default function FavoritesTab() {
    const router = useRouter();

    return (
        <View style={styles.container}>
           <Navbar />
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.topBackground}>
                <View style={styles.middleBackground}>

                    <UserHeader 
                        userName="Favorites" 
                        greeting="FSL" 
                    />

                    <View style={styles.contentBackground}>
                        <SearchBar />
                        
                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Favorites content will go here */}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a3a3a3',
    },
    topBackground: {
        flex: 1,
        backgroundColor: '#a3a3a3',
        paddingTop: 50,
    },
    middleBackground: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 0,
        position: 'relative',
    },
    contentBackground: {
        zIndex: 3,
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -55,
        padding: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 100,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
