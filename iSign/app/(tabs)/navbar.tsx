import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, usePathname } from "expo-router";
import { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';

const Navbar: FC = () => {
    const pathname = usePathname();
    
    // Function to check if current route is focused
    const isFocused = (route: string) => {
        if (route === "/" && pathname === "/") return true;
        if (route !== "/" && pathname.includes(route)) return true;
        return false;
    };

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
        <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
            <View style={styles.navbar}>
                <Link href="/" asChild>
                    <TouchableOpacity activeOpacity={1} style={styles.tabButton}>
                        <TabBarIcon name="home" focused={isFocused("/")} />
                    </TouchableOpacity>
                </Link>

                <Link href="/(tabs)/dictionary" asChild>
                    <TouchableOpacity activeOpacity={1} style={styles.tabButton}>
                        <TabBarIcon name="book-open" focused={isFocused("dictionary")} />
                    </TouchableOpacity>
                </Link>

                <Link href="/(tabs)/camera" asChild>
                    <TouchableOpacity activeOpacity={1} style={styles.tabButton}>
                        <TabBarIcon name="camera" focused={isFocused("camera")} />
                    </TouchableOpacity>
                </Link>

                <Link href="/(tabs)/history" asChild>
                    <TouchableOpacity activeOpacity={1} style={styles.tabButton}>
                        <TabBarIcon name="clock" focused={isFocused("history")} />
                    </TouchableOpacity>
                </Link>

                <Link href="/(tabs)/profile" asChild>
                    <TouchableOpacity activeOpacity={1} style={styles.tabButton}>
                        <TabBarIcon name="user" focused={isFocused("profile")} />
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default Navbar;

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: 10,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        elevation: 10,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 47,
        paddingTop: 10,
        borderTopWidth: 0,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginBottom: 1,
    },
    focusedContainer: {
        transform: [{ translateY: -25 }], 
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
        zIndex: 3, // Ensure icon is on top
    },
    link: {
        color: "#343434",
        fontSize: 12,
        fontWeight: "bold",
    },
});