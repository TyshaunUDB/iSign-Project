import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface FavoritesCardProps {
  title: string;
  subtitle: string;
  onPlayPress: () => void;
  placeholderText: string;
}

export default function FavoritesCard({ title, subtitle, onPlayPress, placeholderText }: FavoritesCardProps) {
  return (
    <View style={styles.favoritesSquare}>
      <Text style={styles.squareTitle}>{title}</Text>
      <Text style={styles.squareSubtitle}>{subtitle}</Text>

      <View style={styles.squareBottom}>
        <TouchableOpacity onPress={onPlayPress} style={styles.playButton}>
          <Ionicons name="arrow-forward-circle-outline" size={30} color="#343434" />
        </TouchableOpacity>

        <View style={styles.hiImageContainer}>
          <Image 
            source={require('../../assets/images/favorites1.png.png')}
            style={styles.favoritesImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  favoritesSquare: {
    borderStyle: 'solid',
    borderWidth: 3,
    width: '48%',
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  squareTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 12,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  squareSubtitle: {
    fontSize: 9,
    color: '#a8a8a8ff',
    marginBottom: 10,
    lineHeight: 9,
  },
  squareBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  playButton: {
    borderColor: '#343434',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
    marginRight: -10,
    width: 55,
    height: 60,
    borderRadius: 0,
    overflow: 'hidden',
  },
  favoritesImage: {
    width: '120%',
    height: '120%',
  },
});