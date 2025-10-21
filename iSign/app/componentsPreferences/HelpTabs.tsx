import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface HelpTabProps {
  title: string;
  content: string[];
}

const HelpTab: React.FC<HelpTabProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.8}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up-outline' : 'chevron-forward-outline'}
          size={22}
          color="#333"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.contentContainer}>
          {content.map((text, index) => (
            <Text key={index} style={styles.contentText}>{text}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  contentContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  contentText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 40,
    lineHeight: 20,
  },
});

export default HelpTab;
