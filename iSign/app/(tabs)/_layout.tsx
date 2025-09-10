import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Feather, Ionicons } from '@expo/vector-icons';

const _Layout = () => {
    // @ts-ignore
    const TabBarIcon = ({ name, focused }) => {
        return (
            <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
                {focused && (
                    <>
                        <View style={styles.outerCircle} />
                        <View style={styles.innerCircle} />
                    </>
                )}
                <Feather
                    name={name}
                    size={24}
                    color={focused ? '#ffffff' : '#343434'}
                    style={styles.icon}
                />
            </View>
        );
    };

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: 'none' }, // This hides the default tab bar completely
                tabBarShowLabel: false,
                headerShown: false, // This removes all headers
                animation: 'none', // Removes animations
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="home" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="dictionary"
                options={{
                    title: 'Dictionary',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="book-open" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: 'Camera',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="camera" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="clock" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="user" focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    focusedContainer: {
        transform: [{ translateY: -15 }], // Budge up when focused
    },
    outerCircle: {
        position: 'absolute',
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    innerCircle: {
        position: 'absolute',
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#000000',
    },
    icon: {
        zIndex: 3, 
    },
});

export default _Layout;