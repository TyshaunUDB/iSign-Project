import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
    message: string;
    isUser?: boolean;
    timestamp?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
    message, 
    isUser = false, 
    timestamp 
}) => {
    return (
        <View style={[
            styles.container, 
            isUser ? styles.userContainer : styles.senderContainer
        ]}>
            <View style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.senderBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    isUser ? styles.userText : styles.senderText
                ]}>
                    {message}
                </Text>
                {timestamp && (
                    <Text style={[
                        styles.timestamp,
                        isUser ? styles.userTimestamp : styles.senderTimestamp
                    ]}>
                        {timestamp}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        paddingHorizontal: 15,
    },
    userContainer: {
        alignItems: 'flex-end',
    },
    senderContainer: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    userBubble: {
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 8,
    },
    senderBubble: {
        backgroundColor: '#E5E5EA',
        borderBottomLeftRadius: 8,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userText: {
        color: 'white',
    },
    senderText: {
        color: '#000',
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
    },
    userTimestamp: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    senderTimestamp: {
        color: '#666',
    },
});

export default ChatBubble;