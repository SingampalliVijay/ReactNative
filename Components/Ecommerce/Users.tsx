import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';
import RadioButton from './RadioButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements';
const data = [
  { label: 'A+', value: '1' },
  { label: 'A-', value: '2' },
  { label: 'AB+', value: '3' },
  { label: 'AB-', value: '4' },
  { label: 'O+', value: '5' },
  { label: 'O-', value: '6' },
];

const Users = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false)
  const [checked, setChecked] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimeVisibility(true);
  };

  const hideTimePicker = () => {
    setTimeVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate(date.toDateString());
    hideDatePicker();
  };

  const handleTimeConfirm = (time: any) => {
    // const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.warn("A Time has been picked: ", time.toTimeString());
    // setTime(formattedTime);
    setTime(time.toTimeString())
    hideTimePicker();
  };

  // const handleProfile = () =>{
  //  Alert.alert('Profile', 'Profile Updated')
  //  setTime('')
  //  setDate('')
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.textContainer}> Name</Text>
        <TextInput style={styles.inputField} placeholder=' John Gresham' />
        <View style={styles.halfContainer}>
          <Text style={styles.textContainer}>Date of birth</Text>
          <View style={styles.dateOfBirthContainer}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput
              style={[styles.dob, { flex: 1, color: 'black' }]}
              placeholder='Mon Sep 09 2024'
              editable={false}
              value={date}
            />
            <TouchableOpacity onPress={showDatePicker} >
              <Icon name='calendar-outline' style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textContainer}>Blood Group</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <Text style={styles.textContainer}>Gender </Text>
        <View style={styles.radioContainer}>
          <RadioButton />
        </View>

        <Text style={styles.textContainer}>Time</Text>
        <View style={styles.dateOfBirthContainer}>
          <DateTimePickerModal
            isVisible={isTimeVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
          <TextInput
            style={[styles.dob, { flex: 1, color: 'black' }]}
            placeholder='00:00:00'
            editable={false}
            value={time}
          />
          <TouchableOpacity onPress={showTimePicker} >
            <Icon name='time-outline' style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Accept Terms & Conditions"
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkbox}
          />
        </View>
        <TouchableOpacity style={styles.profile} onPress={() => Alert.alert('Profile', 'Profile Updated')
        }>
          <Text style={{ fontSize: 20, color: 'white' }}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

export default Users

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55679C',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20
  },
  card: {
    borderColor: 'gray',
    borderWidth: 0.7,
    width: '90%',
    backgroundColor: 'white',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textContainer: {
    fontSize: 16,
    color: '#222831',
    margin: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '94%',
    margin: 10,
    marginLeft: 10,
    marginTop: 1,
  },
  halfContainer: {
    marginHorizontal: 5,
  },
  halfinputField: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '90%',
    margin: 10,
    marginTop: 1,
    paddingHorizontal: 5,
  },
  dob: {
    width: '90%',
    padding: 10,
  },
  dateOfBirthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 5,
  },
  radioContainer: {
    alignItems: 'flex-start',
    borderRadius: 3,
    margin: 5,
    paddingHorizontal: 5,
  },
  icon: {
    fontSize: 20,
    color: '#333',
    padding: 10,
  },
  profile: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    margin: 15,
    marginTop: 10,
    backgroundColor: '#55679C'
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 10,
    marginRight: 10
  },
  checkboxContainer: {
    alignItems: 'center',
    // margin: 10,
  },
  checkbox: {
    backgroundColor: 'white',
    borderWidth: 0
  }
})

