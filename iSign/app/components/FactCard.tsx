import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

interface FactCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonPress: () => void;
}

export default function FactCard({ title, description, buttonText, onButtonPress }: FactCardProps) {
  return (
    <View style={styles.factRectangle}>
      <View style={styles.factImageContainer}>
        <Image 
          source={require('../../assets/images/facts1.png')}
          style={styles.factImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.factContent}>
        <Text style={styles.factTitle}>{title}</Text>
        <Text style={styles.factDescription}>{description}</Text>

        <TouchableOpacity onPress={onButtonPress} style={styles.moreFactsButton}>
          <Text style={styles.moreFactsText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  factRectangle: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 170,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  factImageContainer: {
    width: 130,
    height: 130,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden', // This ensures the image respects the border radius
  },
  factImage: {
    width: '100%',
    height: '100%',
  },
  factContent: {
    flex: 1,
  },
  factTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  factDescription: {
    fontSize: 9,
    color: '#666',
    opacity: 0.8,
    lineHeight: 9,
    marginBottom: 10,
  },
  moreFactsButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#232323',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  moreFactsText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '500',
  },
});