import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
    message: string;
    isUser: boolean;
    timestamp: Date;
}

export default function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <View style={[
            styles.container,
            isUser ? styles.userContainer : styles.otherContainer
        ]}>
            <View style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.otherBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    isUser ? styles.userText : styles.otherText
                ]}>
                    {message}
                </Text>
                <Text style={[
                    styles.timestamp,
                    isUser ? styles.userTimestamp : styles.otherTimestamp
                ]}>
                    {formatTime(timestamp)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        paddingHorizontal: 16,
    },
    userContainer: {
        alignItems: 'flex-end',
    },
    otherContainer: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    userBubble: {
        backgroundColor: '#343434',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#F2F2F2',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 12,
        lineHeight: 20,
        marginBottom: 4,
    },
    userText: {
        color: '#FFFFFF',
    },
    otherText: {
        color: '#000000',
    },
    timestamp: {
        fontSize: 8,
        fontWeight: '500',
    },
    userTimestamp: {
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'right',
    },
    otherTimestamp: {
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'left',
    },
});