import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Keyboard,
    Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

interface ChatInputProps {
    onSendMessage?: (message: string) => void;
    onStartRecording?: () => void;
    onStopRecording?: () => void;
    isRecording?: boolean;
}

export default function ChatInput({
    onSendMessage,
    onStartRecording,
    onStopRecording,
    isRecording = false,
}: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isRecordingLocal, setIsRecordingLocal] = useState(false);
    const [recognizing, setRecognizing] = useState(false);
    const insets = useSafeAreaInsets();
    const recordingAnimation = useRef(new Animated.Value(1)).current;

    // Listen to keyboard events
    useEffect(() => {
        const keyboardWillShow = (event: any) => {
            setKeyboardHeight(event.endCoordinates.height);
        };

        const keyboardWillHide = () => {
            setKeyboardHeight(0);
        };

        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, keyboardWillShow);
        const hideSubscription = Keyboard.addListener(hideEvent, keyboardWillHide);

        return () => {
            showSubscription?.remove();
            hideSubscription?.remove();
        };
    }, []);

    // Speech recognition events
    useSpeechRecognitionEvent('start', () => {
        setRecognizing(true);
        setIsRecordingLocal(true);
    });

    useSpeechRecognitionEvent('end', () => {
        setRecognizing(false);
        setIsRecordingLocal(false);
    });

    useSpeechRecognitionEvent('result', (event) => {
        const transcript = event.results[0]?.transcript;
        if (transcript) {
            setMessage(transcript);
        }
    });

    useSpeechRecognitionEvent('error', (event) => {
        console.error('Speech recognition error:', event.error);
        Alert.alert('Error', `Speech recognition failed: ${event.error}`);
        setRecognizing(false);
        setIsRecordingLocal(false);
    });

    // Start pulsing animation when recording
    useEffect(() => {
        if (isRecordingLocal || isRecording || recognizing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(recordingAnimation, {
                        toValue: 0.5,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(recordingAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            recordingAnimation.setValue(1);
        }
    }, [isRecordingLocal, isRecording, recognizing]);

    const handleSend = () => {
        if (message.trim() && onSendMessage) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleMicrophonePress = async () => {
        if (recognizing || isRecordingLocal) {
            // Stop recording
            ExpoSpeechRecognitionModule.stop();
            if (onStopRecording) {
                onStopRecording();
            }
        } else {
            // Start recording
            try {
                // Request permissions
                const { status } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
                
                if (status !== 'granted') {
                    Alert.alert(
                        'Permission Required',
                        'Microphone permission is required for voice input.'
                    );
                    return;
                }

                // // Check if speech recognition is available
                // const result = await ExpoSpeechRecognitionModule.getStateAsync();
                // if (!result.available) {
                //     Alert.alert(
                //         'Not Available',
                //         'Speech recognition is not available on this device.'
                //     );
                //     return;
                // }

                // Start recognition
                ExpoSpeechRecognitionModule.start({
                    lang: 'en-US',
                    interimResults: true,
                    maxAlternatives: 1,
                    continuous: false,
                    requiresOnDeviceRecognition: false,
                    addsPunctuation: true,
                    contextualStrings: [],
                });

                if (onStartRecording) {
                    onStartRecording();
                }
            } catch (error) {
                console.error('Error starting speech recognition:', error);
                Alert.alert('Error', 'Failed to start voice recording');
            }
        }
    };

    const showSendButton = message.trim().length > 0;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
        >
            <View style={[
                styles.container,
                { 
                    paddingBottom: Math.max(insets.bottom, 16),
                    transform: [{
                        translateY: keyboardHeight > 0 ? -keyboardHeight + insets.bottom + 15 : 0
                    }]
                }
            ]}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Write a message..."
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        value={message}
                        onChangeText={setMessage}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        multiline
                        maxLength={1000}
                    />
                    
                    <View style={styles.buttonContainer}>
                        {!showSendButton ? (
                            <TouchableOpacity
                                style={[
                                    styles.microphoneButton,
                                    (isRecordingLocal || recognizing) && styles.recordingButton
                                ]}
                                onPress={handleMicrophonePress}
                                activeOpacity={0.7}
                            >
                                <Animated.View style={{ opacity: recordingAnimation }}>
                                    <MaterialIcons
                                        name={(isRecordingLocal || recognizing) ? "stop" : "mic"}
                                        size={24}
                                        color={(isRecordingLocal || recognizing) ? "#FF3B30" : "#343434"}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={handleSend}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="send" size={20} color="#343434" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 0,
    },
    container: {
        paddingHorizontal: 10,
        paddingTop: 0,
        backgroundColor: 'transparent',
    },
    inputContainer: {
        bottom: -7,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 0,
        minHeight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textInput: {
        flex: 1,
        fontSize: 13,
        lineHeight: 20,
        maxHeight: 50,
        paddingVertical: 8,
        color: '#000',
    },
    buttonContainer: {
        marginLeft: 12,
        justifyContent: 'flex-end',
    },
    microphoneButton: {
        top: -5,
        width: 30,
        height: 30,
        bottom: 8,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordingButton: {
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
    },
    sendButton: {
        top: -5,
        width: 30,
        height: 30,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
});