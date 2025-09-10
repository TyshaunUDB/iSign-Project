import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

import UserHeader from '../components/Userheader';
import SearchBar from "../components/SearchBar";
import { router, Stack } from "expo-router";
import Navbar from "../(tabs)/navbar";

// Import our new modular components
import AlphabetInfoCard from '../componentsDictionary/AlphabetInfoCard';
import AlphabetGrid from '../componentsDictionary/AlphabetGrid';

export default function FSLAlphabet() {
    return (
        <View style={styles.container}>
            <Navbar />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.topBackground}>
                <View style={styles.middleBackground}>
                    <UserHeader
                        userName="Alphabet"
                        greeting="The FSL"
                    />
                    <View style={styles.contentBackground}>
                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <SearchBar
                                placeholder="Search in FSL Alphabet"
                            />
                            
                            {/* Info card with image and description */}
                            <AlphabetInfoCard />
                            
                            {/* Alphabet grid */}
                            <AlphabetGrid />
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
});