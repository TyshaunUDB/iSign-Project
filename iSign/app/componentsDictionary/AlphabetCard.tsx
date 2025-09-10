import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface AlphabetCardProps {
  letter: string;
  imageSource?: any; // Will be placeholder for now
}

const AlphabetCard: React.FC<AlphabetCardProps> = ({ letter, imageSource }) => {
  return (
    <View style={styles.container}>
      {/* Individual letter image */}
      <Image 
        source={imageSource || require('../../assets/images/fslalphabet.png')} // Fallback to placeholder
        style={styles.signImage}
        resizeMode="cover"
      />
      {/* Letter overlay */}
      <View style={styles.letterOverlay}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  signImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  letterOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
  letter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343434',
  },
});

export default AlphabetCard;