import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConversationItemProps {
    title: string;
    description: string;
    onPress: () => void;
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
    onPress,
    messages = [] 
}) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.leftContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            
            <View style={styles.rightContent}>
                <Ionicons 
                    name="arrow-forward" 
                    size={24} 
                    color="#666" 
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        minHeight: 80,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    leftContent: {
        flex: 1,
        paddingRight: 15,
    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        lineHeight: 16,
    },
    description: {
        fontSize: 9,
        color: '#666',
        opacity: 0.8,
        lineHeight: 12,
    },
    rightContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 30,
    },
});

export default ConversationItem;