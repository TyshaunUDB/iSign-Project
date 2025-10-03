import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface SettingsOptionProps {
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    route: string;
}

export default function SettingsOption({ title, iconName, route }: SettingsOptionProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(route as any);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.leftContent}>
                <Ionicons name={iconName} size={24} color="#343434" style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={24} color="#343434" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
    title: {
        fontSize: 11,
        fontWeight: '500',
        color: '#333333',
    },
});