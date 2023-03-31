import React, { useState, useEffect } from 'react';
import { CheckBox, Text, StyleSheet, View } from 'react-native';

const CheckBoxUI = ({ text, isSelected, setSelection }) => {
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 8,
  },
});

export default CheckBoxUI;
