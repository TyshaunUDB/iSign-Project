import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryItem {
  id: string;
  title: string; // e.g. "A" or "Apple" or "Burger"
  thumbnail?: any; // image source
  media?: any; // image or video source (backend conditional)
}

interface CategoryListProps {
  categoryName: string;
  items: CategoryItem[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryName, items }) => {
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const placeholderImage = require('../../assets/images/facts1.png');

  const openModal = (item: CategoryItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderMediaContent = (item: CategoryItem) => {
   
    return (
      <Image
        source={item.media || placeholderImage}
        style={styles.modalImage}
        resizeMode="contain"
      />
    );
  };

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <View style={styles.itemContainer}>
      <Image
        source={item.thumbnail || placeholderImage}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        onPress={() => openModal(item)}
        style={styles.arrowButton}
      >
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{categoryName}</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            {selectedItem && renderMediaContent(selectedItem)}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 15,
    marginVertical: 10,
  },
  listContent: {
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
  },
  title: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  arrowButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CategoryList;
