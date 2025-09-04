import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatBubble from './ChatBubble';

interface ConversationItemProps {
    title: string;
    description: string;
    messages?: Array<{
        id: string;
        message: string;
        isUser: boolean;
        timestamp?: string;
    }>;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ 
    title, 
    description, 
    messages = [] 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    // Default messages if none provided
    const defaultMessages = [
        { id: '1', message: 'Hello! How can I help you today?', isUser: false, timestamp: '10:30 AM' },
        { id: '2', message: 'I need help with my project', isUser: true, timestamp: '10:31 AM' },
        { id: '3', message: 'Of course! I\'d be happy to help. What kind of project are you working on?', isUser: false, timestamp: '10:31 AM' },
        { id: '4', message: 'It\'s a React Native app for chat history', isUser: true, timestamp: '10:32 AM' },
        { id: '5', message: 'That sounds great! React Native is excellent for building cross-platform mobile apps. What specific features are you implementing?', isUser: false, timestamp: '10:32 AM' },
        { id: '6', message: 'I\'m working on expandable conversation items with chat bubbles', isUser: true, timestamp: '10:33 AM' },
        { id: '7', message: 'Perfect! That\'s a common UI pattern. Are you using any animation libraries for the expand/collapse functionality?', isUser: false, timestamp: '10:33 AM' },
        { id: '8', message: 'Yes, I\'m using React Native\'s Animated API', isUser: true, timestamp: '10:34 AM' },
    ];

    const displayMessages = messages.length > 0 ? messages : defaultMessages;

    const toggleExpansion = () => {
        const toValue = isExpanded ? 0 : 1;
        setIsExpanded(!isExpanded);
        
        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const animatedHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300], // Adjust max height as needed
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.header} 
                onPress={toggleExpansion}
                activeOpacity={0.7}
            >
                <View style={styles.leftContent}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                
                <View style={styles.rightContent}>
                    <Ionicons 
                        name={isExpanded ? "arrow-back" : "arrow-forward"} 
                        size={24} 
                        color="#666" 
                    />
                </View>
            </TouchableOpacity>

            <Animated.View style={[
                styles.expandedContent,
                { height: animatedHeight }
            ]}>
                <ScrollView 
                    style={styles.chatContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {displayMessages.map((msg) => (
                        <ChatBubble
                            key={msg.id}
                            message={msg.message}
                            isUser={msg.isUser}
                            timestamp={msg.timestamp}
                        />
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        minHeight: 80,
        position: 'relative',
    },
    leftArrow: {
        marginRight: 15,
        padding: 5,
    },
    leftContent: {
        flex: 1,
        paddingRight: 15,
    },
    leftContentExpanded: {
        paddingRight: 15,
        paddingLeft: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        opacity: 0.8,
        lineHeight: 18,
    },
    rightContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    expandedContent: {
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
    },
    chatContainer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default ConversationItem;