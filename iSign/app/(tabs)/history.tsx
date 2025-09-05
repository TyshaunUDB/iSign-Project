import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from "react-native";

import UserHeader from '../components/Userheader';
import SearchBar from '../components/SearchBar';
import ConversationItem from '../components/ConversationItem';
import ConversationModal from '../components/ConversationModal';

interface Conversation {
    id: string;
    title: string;
    description: string;
    messages?: Array<{
        id: string;
        message: string;
        isUser: boolean;
        timestamp?: string;
    }>;
}

export default function History() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: '1',
            title: 'Asked for Directions',
            description: 'Asked directions to UST Frassati Building.',
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
    ]);

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleConversationPress = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedConversation(null);
    };

    const handleDeleteConversation = () => {
        if (!selectedConversation) return;

        Alert.alert(
            "Delete Conversation",
            `Are you sure you want to delete "${selectedConversation.title}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setConversations(prev => 
                            prev.filter(conv => conv.id !== selectedConversation.id)
                        );
                        handleCloseModal();
                    }
                }
            ]
        );
    };

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
                                    messages={conversation.messages}
                                    onPress={() => handleConversationPress(conversation)}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>

            <ConversationModal
                visible={modalVisible}
                onClose={handleCloseModal}
                onDelete={handleDeleteConversation}
                title={selectedConversation?.title || ''}
                messages={selectedConversation?.messages}
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