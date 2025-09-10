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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 7,
        paddingHorizontal: 5,
    },
    userContainer: {
        alignItems: 'flex-end',
        marginBottom: 5,
    },
    senderContainer: {
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    userBubble: {
        backgroundColor: '#343434',
        borderBottomRightRadius: 8,
    },
    senderBubble: {
        backgroundColor: '#E5E5EA',
        borderBottomLeftRadius: 8,
    },
    messageText: {
        fontSize: 11,
        lineHeight: 12,
    },
    userText: {
        color: 'white',
    },
    senderText: {
        color: '#000',
    },
});

export default ChatBubble;