import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    // Sample facts pool
    const facts = [
        {
            title: "FSL Fact #1",
            description: "Filipino Sign Language is the natural sign language used by the Filipino Deaf community."
        },
        {
            title: "FSL Fact #2",
            description: "FSL was officially recognized as the national sign language of the Philippines in 2018."
        },
        {
            title: "FSL Fact #3",
            description: "FSL has its own grammar and structure, different from spoken Filipino languages."
        }
    ];

    const handleMoreFacts = () => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    };

    const handleFavoritesPress = () => {
        // Navigate to favorites tab (not implemented yet)
        console.log("Navigate to favorites");
    };

    const handleSignOfDayPress = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* First background layer - darkest gray */}
            <View style={styles.topBackground}>

                {/* Second background layer - medium gray */}
                <View style={styles.middleBackground}>

                    {/* Header content - user info and settings */}
                    <View style={styles.headerContent}>

                        {/* Left side - User greeting */}
                        <View style={styles.userGreeting}>
                            <Text style={styles.kamustaText}>kamusta</Text>
                            <Text style={styles.nameText}>Popoy</Text>
                        </View>

                        {/* Right side - Mascot and Settings */}
                        <View style={styles.rightSection}>

                            <Image
                                source={require('../../assets/icons/mascot.png')} // Replace with your actual image path
                                style={styles.mascotImage}
                                resizeMode="contain"
                            />
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#666"
                                style={styles.settingsIcon}
                            />
                        </View>
                    </View>

                    {/* Third background layer - lightest gray (main content area) */}
                    <View style={styles.contentBackground}>

                        {/* Scrollable Main Content */}
                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >

                            {/* First Row - Two squares */}
                            <View style={styles.firstRow}>

                                {/* Square 1 - Favorites */}
                                <View style={styles.favoritesSquare}>
                                    <Text style={styles.squareTitle}>FAVORITES FROM YOUR FSL DICTIONARY</Text>
                                    <Text style={styles.squareSubtitle}>review your saved fsl signs</Text>

                                    <View style={styles.squareBottom}>
                                        <TouchableOpacity onPress={handleFavoritesPress} style={styles.playButton}>
                                            <Ionicons name="play" size={20} color="#fff" />
                                        </TouchableOpacity>

                                        <View style={styles.hiImageContainer}>
                                            <Text style={styles.placeholderImage}>👋 HI</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Square 2 - Sign of the Day */}
                                <TouchableOpacity style={styles.signOfDaySquare} onPress={handleSignOfDayPress}>
                                    <View style={styles.signOfDayContent}>
                                        <Text style={styles.signOfDayPlaceholder}>📸 SIGN OF THE DAY</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Second Row - Full width rectangle */}
                            <View style={styles.factRectangle}>
                                <View style={styles.factImageContainer}>
                                    <Text style={styles.factImagePlaceholder}>📚</Text>
                                </View>

                                <View style={styles.factContent}>
                                    <Text style={styles.factTitle}>{facts[currentFactIndex].title}</Text>
                                    <Text style={styles.factDescription}>{facts[currentFactIndex].description}</Text>

                                    <TouchableOpacity onPress={handleMoreFacts} style={styles.moreFactsButton}>
                                        <Text style={styles.moreFactsText}>more facts</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Recent Chit Chats Section */}
                            <View style={styles.chitChatsContainer}>
                                {/* Title Card */}
                                <View style={styles.titleCardContainer}>
                                    <View style={styles.titleCardImage}>
                                        <Text style={styles.titleCardPlaceholder}>💬</Text>
                                    </View>
                                    <Text style={styles.chitChatsTitle}>Recent Chit Chats</Text>
                                </View>

                                {/* Chat Item */}
                                <TouchableOpacity style={styles.chatItemContainer}>
                                    <View style={styles.chatItemContent}>
                                        <Text style={styles.chatItemTitle}>Asked for directions</Text>
                                        <Text style={styles.chatItemDate}>Chat from November 6, 2024</Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward-outline"
                                        size={20}
                                        color="#999"
                                        style={styles.chatItemArrow}
                                    />
                                </TouchableOpacity>
                            </View>

                        </ScrollView>

                    </View>
                </View>
            </View>

            {/* Modal for Sign of the Day */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>

                        <View style={styles.modalBody}>
                            <View style={styles.modalImageContainer}>
                                <Text style={styles.modalImagePlaceholder}>📸 SIGN OF THE DAY</Text>
                            </View>

                            <View style={styles.modalExplanation}>
                                <Text style={styles.modalTitle}>Today's Sign</Text>
                                <Text style={styles.modalDescription}>
                                    This is the explanation for today's sign. Here you would describe
                                    how to perform the sign, its meaning, and any relevant context.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a3a3a3', // Darkest background (status bar area)
    },

    // First layer - darkest background
    topBackground: {
        flex: 1,
        backgroundColor: '#a3a3a3',
        paddingTop: 50, // Space for status bar (adjust based on your needs)
    },

    // Second layer - medium gray background
    middleBackground: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 0, // Space to show the darker background above
        position: 'relative', // For positioning the mascot
    },

    // Header section with user info and settings
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 20,
        zIndex: 2, // Make sure it's above the mascot
    },

    // User greeting section (left side)
    userGreeting: {
        flex: 1,
    },

    kamustaText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },

    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    // Right section with mascot and settings
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },

    mascotImage: {
        width: 150,
        height: 150,
        marginRight: 10,
        marginTop: -40,
        zIndex: -1, // Behind the content background but visible
    },

    settingsIcon: {
        marginTop: -50,
        marginRight: 10,
        zIndex: 2, // Above everything
    },

    // Third layer - lightest background (main content)
    contentBackground: {
        zIndex: 3,
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -50, // Space to show the medium background above
        padding: 20,
        // The mascot will peek through behind this container
    },

    // Content container
    scrollContainer: {
        flex: 1,
    },

    contentContainer: {
        gap: 15,
        paddingBottom: 100, // Much more padding to ensure full scroll access
    },

    // First row with two squares
    firstRow: {
        flexDirection: 'row',
        gap: 15,
        height: 170,
    },

    // Favorites square
    favoritesSquare: {
        borderStyle: 'solid',
        borderWidth: 3,
        width: '48%',
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 15,
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    squareTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 12,
        marginBottom: 4,
        flexWrap: 'wrap',
    },

    squareSubtitle: {
        fontSize: 9,
        color: '#666',
        marginBottom: 10,
        lineHeight: 9,
    },

    squareBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },

    playButton: {
        backgroundColor: '#4CAF50',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    hiImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },

    placeholderImage: {
        fontSize: 16,
    },

    // Sign of the day square
    signOfDaySquare: {
        width: '48%',
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    signOfDayContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    signOfDayPlaceholder: {
        fontSize: 24,
        textAlign: 'center',
    },

    // Fact rectangle
    factRectangle: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 170,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    factImageContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    factImagePlaceholder: {
        fontSize: 32,
    },

    factContent: {
        flex: 1,
    },

    modalDescription: {

    },

    factTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },

    factDescription: {
        fontSize: 10,
        color: '#666',
        opacity: 0.8,
        lineHeight: 12,
        marginBottom: 10,
    },

    moreFactsButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#232323',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },

    moreFactsText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '500',
    },

    // Future content space
    futureContentSpace: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#ddd',
    },

    futureContentText: {
        color: '#999',
        fontSize: 14,
    },

    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
        position: 'relative',
    },

    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBody: {
        marginTop: 20,
    },

    modalImageContainer: {
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    modalImagePlaceholder: {
        fontSize: 48,
    },

    modalExplanation: {
        paddingHorizontal: 10,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },

    // Recent Chit Chats styles
    chitChatsContainer: {
        borderWidth: 3,
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        minHeight: 200,
        overflow: 'hidden', // This ensures content respects border radius
    },

    titleCardContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    titleCardImage: {
        width: 60,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    titleCardPlaceholder: {
        fontSize: 24,
    },

    chitChatsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },

    chatItemContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    chatItemContent: {
        flex: 1,
    },

    chatItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },

    chatItemDate: {
        fontSize: 14,
        color: '#666',
        opacity: 0.7,
    },

    chatItemArrow: {
        marginLeft: 10,
    },
});