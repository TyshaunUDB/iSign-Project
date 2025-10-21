import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AlphabetInfoCard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Left side - FSL Alphabet image */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/fslalphabet.png')} // Make sure this path is correct for your project
          style={styles.alphabetImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Right side - Title and description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>The FSL Alphabet</Text>
        <Text style={styles.description}>
          The FSL alphabet uses one-handed signs to represent each letter, allowing users to spell out words and names in Filipino Sign Language.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 16,
  },
  alphabetImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    color: '#888888',
    lineHeight: 10,
  },
});

export default AlphabetInfoCard;