import { Text, View, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface SignOfDayModalProps {
  visible: boolean;
  onClose: () => void;
  modalTitle: string;
  modalDescription: string;
}

export default function SignOfDayModal({ visible, onClose, modalTitle, modalDescription }: SignOfDayModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>

          <View style={styles.modalBody}>
            <View style={styles.modalImageContainer}>
              <Image
                source={require('../../assets/images/sotd1.png')}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.modalExplanation}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalDescription}>{modalDescription}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    marginTop: 20,
  },
  modalImageContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  modalExplanation: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});