import React from 'react';
import { 
    View, 
    Text, 
    Modal, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatBubble from './ChatBubble';

interface ConversationModalProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    messages?: Array<{
        id: string;
        message: string;
        isUser: boolean;
        timestamp?: string;
    }>;
}

const ConversationModal: React.FC<ConversationModalProps> = ({
    visible,
    onClose,
    onDelete,
    title,
    messages = []
}) => {
    // Default messages if none provided
    const defaultMessages = [
        { id: '1', message: 'Hello!', isUser: false},
        { id: '2', message: 'Paano Pumuntang Frassati?', isUser: true},
        { id: '3', message: 'Sumakay ka ng Jeep papuntang Espanya.', isUser: false},
        { id: '4', message: 'Saan ako bababa?', isUser: true },
        { id: '5', message: 'Pwede kang bumaba ng overpass.', isUser: false},
        { id: '6', message: 'Okaya naman, kung sa kabila ka manggagaling, bumaba ka ng Gate 3.', isUser: false},
        { id: '7', message: 'Maraming salamat!', isUser: true},
        { id: '8', message: 'Ingat.', isUser: false},
        { id: '9', message: 'Mag-iingat ka rin.', isUser: true},
    ];

    const displayMessages = messages.length > 0 ? messages : defaultMessages;

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftSection}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={onDelete}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="trash-outline" size={28} color="#343434" />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="close" size={23} color="#343434" />
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.messagesContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messagesContent}
                >
                    {displayMessages.map((msg) => (
                        <ChatBubble
                            key={msg.id}
                            message={msg.message}
                            isUser={msg.isUser}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    deleteButton: {
        padding: 8,
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    closeButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    messagesContent: {
        paddingVertical: 20,
        flexGrow: 1,
    },
});

export default ConversationModal;