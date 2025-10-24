import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

// Import all components
import UserHeader from '../components/Userheader';
import SearchBar from "../components/SearchBar";
import { router, Stack } from "expo-router";
import Navbar from "../(tabs)/navbar";
import CategoryList from "./CategoryLists";
import CategoryInfoCard from "./CategoryInfoCard";


export default function FSLFoodCategory() {
    const [modalVisible, setModalVisible] = useState(false);

    const foodItems = [
  { id: '1', title: 'Apple' },
  { id: '2', title: 'Banana' },
  { id: '3', title: 'Pizza' },
];

    return (
        <View style={styles.container}>
              <Navbar />
               <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.topBackground}>
                <View style={styles.middleBackground}>

                    <UserHeader 
                        userName="Category" 
                        greeting="FSL Food" 
                    />

                    <View style={styles.contentBackground}>
                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >

                        <SearchBar
                            placeholder="Search in FSL Food Category"
                        />

                        <CategoryInfoCard 
                        title={"FSL Food Category"} 
                        description={"Learn how to sign common food items and dining-related words in Filipino Sign Language. This category covers everyday vocabulary, helping you communicate your cravings"} 
                        imageSource={require('../../assets/images/fslfood.png')} />

                        <CategoryList categoryName="Let's Learn to sign Food!" items={foodItems} />

                           

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
    firstRow: {
        flexDirection: 'row',
        gap: 15,
        height: 170,
    },
});
