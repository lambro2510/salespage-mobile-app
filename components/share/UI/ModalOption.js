import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View } from 'react-native';

const ModalOption = ({
  isVisible,
  setIsVisible,
  modalTitle,
  listOption,
  setValue,
}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [animationType, setAnimationType] = useState('slide');

  useEffect(() => {
    setIsModalVisible(isVisible);
  }, [isVisible]);

  const handleValueSelect = (value) => {
    setValue(value);
    toggleModal();
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const slideAnimation = {
    transform: [
      {
        translateY: isModalVisible
          ? 0
          : 1000,
      },
    ],
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType={animationType}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, slideAnimation]}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          {listOption.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleValueSelect(option.label)}
              style={styles.optionContainer}>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333333',
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
});

export default ModalOption;
