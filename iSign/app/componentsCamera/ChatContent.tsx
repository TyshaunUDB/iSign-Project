import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ChatBubble from './ChatBubble';

interface ChatContentProps {
    isExpanded: boolean;
}

// Mock chat data - replace with your actual chat state
const mockChats = [
    {
        id: '1',
        message: 'Ako si Basha.',
        isUser: true,
        timestamp: new Date(),
    },
    {
        id: '2',
        message: 'Ako naman si Popoy!',
        isUser: false,
        timestamp: new Date(),
    },
    {
        id: '3',
        message: 'Kamusta ka?',
        isUser: true,
        timestamp: new Date(),
    },
    {
        id: '4',
        message: 'Masaya!',
        isUser: false,
        timestamp: new Date(),
    },
    {
        id: '5',
        message: 'Gaano kasaya?',
        isUser: true,
        timestamp: new Date(),
    },

       {
        id: '6',
        message: 'Basta',
        isUser: false,
        timestamp: new Date(),
    },
];

export default function ChatContent({ isExpanded }: ChatContentProps) {
    if (!isExpanded) {
        return (
            <View style={styles.collapsedContainer}>
                <Text style={styles.collapsedText}>
                    Pull up to view chat history
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContent}
                showsVerticalScrollIndicator={false}
            >
                {mockChats.map((chat) => (
  <View key={chat.id} style={{ marginBottom: 12 }}>
    <ChatBubble
      message={chat.message}
      isUser={chat.isUser}
      timestamp={chat.timestamp}
    />
  </View>
))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    collapsedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    collapsedText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 16,
        fontWeight: '500',
    },
    chatContainer: {
        flex: 1,
    },
    chatContent: {

    },
});