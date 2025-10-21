import { View, Text, StyleSheet } from "react-native";
import Navbar from "./navbar";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Navbar />
            <Text style={styles.text}>Profile Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
    },
});
