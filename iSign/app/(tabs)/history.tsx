import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";

import UserHeader from '../components/Userheader';
import SearchBar from '../components/SearchBar';
import ConversationItem from '../components/ConversationItem';

export default function History() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample conversation data
    const conversations = [
        {
            id: '1',
            title: 'React Native Development',
            description: 'Discussion about building mobile apps with React Native and best practices',
        },
        {
            id: '2',
            title: 'API Integration Help',
            description: 'Help with integrating REST APIs and handling async operations',
        },
        {
            id: '3',
            title: 'UI/UX Design Tips',
            description: 'Conversation about creating better user interfaces and user experience',
        },
        {
            id: '4',
            title: 'Database Management',
            description: 'Questions about database design and optimization techniques',
        },
        {
            id: '5',
            title: 'Performance Optimization',
            description: 'Tips for improving app performance and reducing load times',
        },
    ];

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.topBackground}>
                <View style={styles.middleBackground}>

                    <UserHeader 
                        userName="History" 
                        greeting="Chat" 
                    />

                    <View style={styles.contentBackground}>
                        <SearchBar
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        
                        <ScrollView 
                            style={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {filteredConversations.map((conversation) => (
                                <ConversationItem
                                    key={conversation.id}
                                    title={conversation.title}
                                    description={conversation.description}
                                />
                            ))}
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
        marginBottom: 85
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingBottom: 20,
        flexGrow: 1,
    },
});