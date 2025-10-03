import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

type ChangeInfoButtonProps = {
  buttonText: string;  // This will allow dynamic text input
  onPress?: () => void;  // Optional onPress handler, to pass custom logic if needed
};

const ChangeInfoButton: React.FC<ChangeInfoButtonProps> = ({ buttonText, onPress }) => {
  const handlePress = () => {
    // If no custom onPress is passed, use the default alert
    if (onPress) {
      onPress();  // Use custom onPress logic if provided
    } else {
      Alert.alert('Change Info', 'Update profile information');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#343434',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,  // Increase horizontal padding if needed
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 150,  // Fixed width, change this value as needed
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 10, // Adjust font size if necessary
    fontWeight: '500',
  },
});

export default ChangeInfoButton;
