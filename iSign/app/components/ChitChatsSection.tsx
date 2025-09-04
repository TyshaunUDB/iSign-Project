import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface ChatItem {
  title: string;
  date: string;
}

interface ChitChatsSectionProps {
  titleIcon: string;
  sectionTitle: string;
  chatItems: ChatItem[];
  onChatItemPress?: (index: number) => void;
}

export default function ChitChatsSection({ titleIcon, sectionTitle, chatItems, onChatItemPress }: ChitChatsSectionProps) {
  return (
    <View style={styles.chitChatsContainer}>
      <View style={styles.titleCardContainer}>
        <View style={styles.titleCardImage}>
          <Image 
            source={require('../../assets/images/chitchats1.jpg')}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.chitChatsTitle}>{sectionTitle}</Text>
      </View>

      {chatItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.chatItemContainer}
          onPress={() => onChatItemPress?.(index)}
        >
          <View style={styles.chatItemContent}>
            <Text style={styles.chatItemTitle}>{item.title}</Text>
            <Text style={styles.chatItemDate}>{item.date}</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#999"
            style={styles.chatItemArrow}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chitChatsContainer: {
    borderWidth: 3,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    minHeight: 200,
    overflow: 'hidden',
  },
  titleCardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleCardImage: {
    width: 300,
    height: 135,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleImage: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  chitChatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  chatItemContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatItemContent: {
    flex: 1,
  },
  chatItemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 0,
  },
  chatItemDate: {
    fontSize: 9,
    color: '#666',
    opacity: 0.7,
  },
  chatItemArrow: {
    marginLeft: 10,
  },
});