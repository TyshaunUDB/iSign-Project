import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Feather, Ionicons } from '@expo/vector-icons';
import Navbar from './navbar';

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    // Check permissions
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.text}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }


    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <Navbar />
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={cameraRef}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                        <Feather name="refresh-ccw" size={16} color="white" style={{ marginRight: 4 }} />
                    </TouchableOpacity>
                </View>
            </CameraView>
            <View style={styles.navbarSpacer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 18,
        color: 'white',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 40,
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#1e3a8a',
        padding: 15,
        borderRadius: 10,
        margin: 20,
    },
    flipButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 12,
        borderRadius: 25,
        minWidth: 60,
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    navbarSpacer: {
        height: 90,
        backgroundColor: 'transparent',
    },
});