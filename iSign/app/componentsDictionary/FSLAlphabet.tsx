import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

import UserHeader from '../components/Userheader';
import SearchBar from "../components/SearchBar";
import { router, Stack } from "expo-router";
import Navbar from "../(tabs)/navbar";
import CategoryInfoCard from "./CategoryInfoCard";

// Import our new modular components
import CategoryList from "./CategoryLists";

const alphabetItems = Array.from({ length: 26 }, (_, i) => ({
  id: `${i}`,
  title: String.fromCharCode(65 + i),
  // thumbnail: require('../../assets/images/signs/a.png'),
  // media: require('../../assets/images/signs/a.png'), // or video later
}));


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
                            
                           <CategoryInfoCard 
                           title={"The FSL Alphabet"} 
                           description={"The FSL alphabet uses one-handed signs to represent each letter, allowing users to spell out words and names in Filipino Sign Language."} 
                           imageSource={require('../../assets/images/fslalphabet.png')} />
                            
                            <CategoryList categoryName="Let's Learn to sign the Alphabet!" items={alphabetItems} />

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