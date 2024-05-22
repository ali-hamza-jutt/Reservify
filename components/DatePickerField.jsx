import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const CustomDatePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [isDatePickerReady, setIsDatePickerReady] = useState(false);

  useEffect(() => {
    // Pre-render DatePicker component by setting it ready when the component mounts
    setIsDatePickerReady(true);
  }, []);

  function handleTap() {
    setOpen(true);
  }

  function handleDateChange(selectedDate) {
    setDate(selectedDate);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text>DatePicker</Text>
      <TouchableOpacity onPress={handleTap}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={date} 
            placeholder="Select a date" 
            editable={false} // making the input non-editable, to be used only for display
          />
        </View>
      </TouchableOpacity>
      {open && isDatePickerReady && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={open}
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.datePicker}>
                  <DatePicker
                    mode="calendar"
                    onSelectedChange={handleDateChange}
                    options={{
                      textHeaderColor: '#000',
                      textDefaultColor: '#000',
                      selectedTextColor: '#FFF',
                      mainColor: '#1E90FF',
                      textSecondaryColor: '#000',
                      borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                  />
                  <TouchableOpacity onPress={handleClose}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePicker: {
    width: 350,  // Adjust the width as needed
    height: 400, // Adjust the height as needed
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginBottom: 30,
    padding: 10,
    color: '#fff',
    backgroundColor: '#50D0FF',
    borderRadius: 12,
  }
});
