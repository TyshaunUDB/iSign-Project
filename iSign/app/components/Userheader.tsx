import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

interface UserHeaderProps {
  userName: string;
  greeting: string;
}

export default function Userheader({ userName, greeting }: UserHeaderProps) {
  return (
    <View style={styles.headerContent}>
      <View style={styles.userGreeting}>
        <Text style={styles.kamustaText}>{greeting}</Text>
        <Text style={styles.nameText}>{userName}</Text>
      </View>

      <View style={styles.rightSection}>
        <Image
          source={require('../../assets/icons/mascot.png')}
          style={styles.mascotImage}
          resizeMode="contain"
        />

        {/* ✅ Corrected navigation path */}
        <TouchableOpacity onPress={() => router.push('/components/Preferences')}>
          <Ionicons
            name="settings"
            size={24}
            color="#343434"
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 2,
  },
  userGreeting: {
    flex: 1,
  },
  kamustaText: {
    marginLeft: 10,
    marginTop: 1,
    fontSize: 14,
    color: '#343434',
    fontWeight: 'bold',
    marginBottom: -8,
  },
  nameText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343434',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  mascotImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginTop: -40,
    zIndex: -1,
  },
  settingsIcon: {
    marginTop: -50,
    marginRight: 10,
    zIndex: 2,
  },
});