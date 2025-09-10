import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_HEIGHT = 120;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.7;

export default function ChatTab() {
    const insets = useSafeAreaInsets();
    const [isExpanded, setIsExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;

    const toggleExpanded = () => {
        const toValue = isExpanded ? MIN_HEIGHT : MAX_HEIGHT;
        setIsExpanded(!isExpanded);

        Animated.spring(animatedHeight, {
            toValue,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
        }).start();
    };

    return (
        <Animated.View
            style={[
                styles.wrapper,
                { height: animatedHeight, paddingBottom: insets.bottom }
            ]}
        >
            {/* Blur background */}
  <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />


            {/* Foreground content */}
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.dragHandle}
                    onPress={toggleExpanded}
                    activeOpacity={0.7}
                >
                    <View style={styles.dragIndicator} />
                    <Ionicons
                        name={isExpanded ? "remove-outline" : "remove-outline"}
                        size={20}
                        color="transparent"
                    />
                </TouchableOpacity>
                <ChatContent isExpanded={isExpanded} />
                <ChatInput />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden', // makes blur respect rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flex: 1,
    },
    dragHandle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    dragIndicator: {
        left: 15,
        width: 90,
        height: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 2,
        marginRight: 8,
    },
});
