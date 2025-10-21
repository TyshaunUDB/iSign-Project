import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AlphabetCard from './AlphabetCard';

const AlphabetGrid: React.FC = () => {
  // Generate alphabet array A-Z
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // Function to get individual image for each letter
  const getImageForLetter = (letter: string) => {
    // Add custom images for each letter if available
    // Example:
    // switch (letter) {
    //   case 'A': return require('../../assets/images/signs/a.png');
    //   case 'B': return require('../../assets/images/signs/b.png');
    //   ...
    //   default: return undefined;
    // }
    return undefined; // Uses placeholder in AlphabetCard
  };

//   const getImageForLetter = (letter: string) => {
//   switch (letter) {
//     case 'A': return require('../../assets/images/signs/a.png');
//     case 'B': return require('../../assets/images/signs/b.png');
//     case 'C': return require('../../assets/images/signs/c.png');
//     case 'D': return require('../../assets/images/signs/d.png');
//     case 'E': return require('../../assets/images/signs/e.png');
//     case 'F': return require('../../assets/images/signs/f.png');
//     case 'G': return require('../../assets/images/signs/g.png');
//     case 'H': return require('../../assets/images/signs/h.png');
//     case 'I': return require('../../assets/images/signs/i.png');
//     case 'J': return require('../../assets/images/signs/j.png');
//     case 'K': return require('../../assets/images/signs/k.png');
//     case 'L': return require('../../assets/images/signs/l.png');
//     case 'M': return require('../../assets/images/signs/m.png');
//     case 'N': return require('../../assets/images/signs/n.png');
//     case 'O': return require('../../assets/images/signs/o.png');
//     case 'P': return require('../../assets/images/signs/p.png');
//     case 'Q': return require('../../assets/images/signs/q.png');
//     case 'R': return require('../../assets/images/signs/r.png');
//     case 'S': return require('../../assets/images/signs/s.png');
//     case 'T': return require('../../assets/images/signs/t.png');
//     case 'U': return require('../../assets/images/signs/u.png');
//     case 'V': return require('../../assets/images/signs/v.png');
//     case 'W': return require('../../assets/images/signs/w.png');
//     case 'X': return require('../../assets/images/signs/x.png');
//     case 'Y': return require('../../assets/images/signs/y.png');
//     case 'Z': return require('../../assets/images/signs/z.png');
//     default: return undefined;
//   }
// };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {alphabet.map((letter) => (
          <AlphabetCard
            key={letter}
            letter={letter}
            imageSource={getImageForLetter(letter)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // allows items to wrap to new lines
    justifyContent: 'space-between',
  },
});

export default AlphabetGrid;
