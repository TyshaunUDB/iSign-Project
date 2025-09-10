import React from 'react';
import { View, StyleSheet } from 'react-native';
import AlphabetCard from './AlphabetCard';

const AlphabetGrid: React.FC = () => {
  // Generate alphabet array A-Z
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  // Split alphabet into 3 rows as evenly as possible
  const getAlphabetRows = () => {
    const rows = [];
    let currentIndex = 0;
    
    // First row: A-I (9 letters)
    rows.push(alphabet.slice(currentIndex, currentIndex + 9));
    currentIndex += 9;
    
    // Second row: J-Q (8 letters) 
    rows.push(alphabet.slice(currentIndex, currentIndex + 8));
    currentIndex += 8;
    
    // Third row: R-Z (9 letters)
    rows.push(alphabet.slice(currentIndex, currentIndex + 9));
    
    return rows;
  };

  // Function to get individual image for each letter
  const getImageForLetter = (letter: string) => {
    // You can add your individual images here
    // For now, returning undefined to use placeholder
    // Example: 
    // switch(letter) {
    //   case 'A': return require('../../assets/images/signs/a.png');
    //   case 'B': return require('../../assets/images/signs/b.png');
    //   // ... add all letters
    //   default: return undefined;
    // }
    return undefined; // This will use the placeholder image
  };

  const alphabetRows = getAlphabetRows();

  return (
    <View style={styles.container}>
      {alphabetRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter) => (
            <AlphabetCard 
              key={letter} 
              letter={letter}
              imageSource={getImageForLetter(letter)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 4,
    gap: 10,
  },
});

export default AlphabetGrid;