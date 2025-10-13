import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

// Import all components
import UserHeader from '../components/Userheader';
import FavoritesCard from '../components/FavoritesCard';
import SignOfDayCard from '../components/SignOfDayCard';
import FactCard from '../components/FactCard';
import ChitChatsSection from '../components/ChitChatsSection';
import SignOfDayModal from '../components/SignOfDayModal';
import { router } from "expo-router";
import Navbar from "./navbar";

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    const facts = [
        {
            title: "Did you know?",
            description: "Filipino Sign Language is the natural sign language used by the Filipino Deaf community."
        },
        {
            title: "Did you know?",
            description: "FSL was officially recognized as the national sign language of the Philippines in 2018."
        },
        {
            title: "Did you know?",
            description: "FSL has its own grammar and structure, different from spoken Filipino languages."
        }
    ];

    const chatItems = [
        {
            title: "Asked for directions",
            date: "Chat from November 6, 2024"
        },
        {
            title: "McDonald's Order",
            date: "Chat from October 29, 2024"
        }
    ];

    const handleMoreFacts = () => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    };

    // ✅ Navigation to FavoritesTab.tsx
    const handleFavoritesPress = () => {
        router.push("/componentsDictionary/FavoritesTab");
    };

    const handleSignOfDayPress = () => {
        setModalVisible(true);
    };

    const handleChatItemPress = (index: number) => {
        console.log("Chat item pressed:", index);
    };

    return (
        
        <View style={styles.container}>
              <Navbar />
            <View style={styles.topBackground}>
                <View style={styles.middleBackground}>

                    <UserHeader 
                        userName="Popoy" 
                        greeting="Kamusta," 
                    />

                    <View style={styles.contentBackground}>
                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >

                            <View style={styles.firstRow}>
                                <FavoritesCard
                                    title="FAVORITES FROM YOUR FSL DICTIONARY"
                                    subtitle="Review your saved FSL signs"
                                    onPlayPress={handleFavoritesPress}
                                    placeholderText="👋 HI"
                                />

                                <SignOfDayCard
                                    onPress={handleSignOfDayPress}
                                />
                            </View>

                            <FactCard
                                title={facts[currentFactIndex].title}
                                description={facts[currentFactIndex].description}
                                buttonText="More Facts"
                                onButtonPress={handleMoreFacts}
                            />

                            <ChitChatsSection
                                titleIcon="💬"
                                sectionTitle="Recent Chit Chats"
                                chatItems={chatItems}
                                onChatItemPress={handleChatItemPress}
                            />


                        </ScrollView>
                    </View>
                </View>
            </View>

            <SignOfDayModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                modalTitle="Today's Sign"
                modalDescription="This is the explanation for today's sign. Here you would describe how to perform the sign, its meaning, and any relevant context."
            />
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
