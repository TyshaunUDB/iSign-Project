import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

// Import components
import UserHeader from '../components/Userheader';
import SearchBar from '../components/SearchBar';
import FavoritesHeader from '../componentsDictionary/FavoritesHeader';
import DictionaryCard from '../componentsDictionary/DictionaryCard';
import { router } from 'expo-router';
import Navbar from './navbar';

export default function Dictionary() {
    
    const handleFavoritesPress = () => {
         router.push("/componentsDictionary/FavoritesTab");
    };

    const handleCardArrowPress = () => {
        Alert.alert('Card Arrow', 'This will open detailed view');
    };

    const handleFavoriteToggle = (isFavorited: boolean) => {
        console.log('Favorite toggled:', isFavorited);
    };

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.topBackground}>
                <View style={styles.middleBackground}>

                    <UserHeader 
                        userName="Dictionary" 
                        greeting="Your FSL" 
                    />

                    <View style={styles.contentBackground}>

                          <SearchBar
                            placeholder="Search Dictionary"
                        />
                        
                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <FavoritesHeader onPress={handleFavoritesPress} />
                            
                           <DictionaryCard
                                title="FSL Alphabet"
                                description="Click to learn the FSL alphabet"
                                onArrowPress={handleCardArrowPress}
                                onFavoritePress={handleFavoriteToggle}
                                initialFavorited={false}
                                imageSource={require('../../assets/images/fslalphabet.png')}
                                />


                             <DictionaryCard
                                title="FSL Food Category"
                                description="Click to learn to sign Adobo and Sinigang"
                                onArrowPress={handleCardArrowPress}
                                onFavoritePress={handleFavoriteToggle}
                                initialFavorited={false}
                            />
                            
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