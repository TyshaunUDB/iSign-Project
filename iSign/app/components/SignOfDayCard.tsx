import { View, TouchableOpacity, StyleSheet, Image } from "react-native";

interface SignOfDayCardProps {
  onPress: () => void;
}

export default function SignOfDayCard({ onPress }: SignOfDayCardProps) {
  return (
    <TouchableOpacity style={styles.signOfDaySquare} onPress={onPress}>
      <View style={styles.signOfDayContent}>
        <Image
          source={require('../../assets/images/sotd1.png')}
          style={styles.signOfDayImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signOfDaySquare: {
    width: '48%',
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signOfDayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOfDayImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});