import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DeletedItem {
  id: string;
  title: string;
  subtitle: string;
}

interface RecentlyDeletedItemsProps {
  data: DeletedItem[];
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const RecentlyDeletedItems: React.FC<RecentlyDeletedItemsProps> = ({ data, onRestore, onDelete }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* Left Side: Title + Subtitle */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            {/* Right Side: Restore + Delete Icons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => onRestore?.(item.id)}>
                <Ionicons name="refresh-circle-outline" size={26} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete?.(item.id)} style={{ marginLeft: 15 }}>
                <Ionicons name="trash-outline" size={26} color="#E53935" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No deleted conversations found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 9,
    color: '#777',
    marginTop: 3,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginTop: 20,
  },
});

export default RecentlyDeletedItems;
