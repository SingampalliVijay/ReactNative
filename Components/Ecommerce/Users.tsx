import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';
import RadioButton from './RadioButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox, colors, Image } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const data = [
  { label: 'A+', value: '1' },
  { label: 'A-', value: '2' },
  { label: 'AB+', value: '3' },
  { label: 'AB-', value: '4' },
  { label: 'O+', value: '5' },
  { label: 'O-', value: '6' },
]

const Users = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false)
  const [checked, setChecked] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

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
    // console.warn("A Time has been picked: ", time.toTimeString());
    // setTime(formattedTime);
    setTime(time.toTimeString())
    hideTimePicker();
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
    });
    if (result.didCancel) {
      Alert.alert('Camera Cancelled')
    } else if (result.assets) {
      setImageUri(result.assets[0].uri ?? null);
      setVisible(false)
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.didCancel) {
      Alert.alert('Gallery Cancelled');
    } else if (result.assets) {
      setImageUri(result.assets[0].uri ?? null);
      setVisible(false)
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showDialog = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={visible ? styles.transparent : styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Open With</Text>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={openCamera}>
                <Text style={styles.textStyle}>Camera</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={openGallery}>
                <Text style={styles.textStyle}>Gallery</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleCancel}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={visible ? styles.transparentCard : styles.card}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image style={visible ? styles.transparentImg : styles.image} resizeMode='contain' source={imageUri ? { uri: imageUri } : { uri: 'data:image/png;base64,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' }} />
          <TouchableOpacity onPress={showDialog}>
            <Icon style={styles.camera} name='camera-outline'></Icon>
          </TouchableOpacity>
        </View>
        <Text style={styles.textContainer}> Name</Text>
        <TextInput style={styles.inputField} placeholder='  John Gresham' />
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
            placeholder={!isFocus ? ' Select item' : '...'}
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
            containerStyle={visible ? styles.transBox : styles.checkbox}
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
    backgroundColor: '#295F98',
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,

  },
  transparent: {
    backgroundColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentCard: {
    backgroundColor: 'gray',
    borderColor: 'white',
    borderWidth: 0.7,
    width: '90%',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    borderColor: 'white',
    borderWidth: 0.7,
    width: '90%',
    backgroundColor: 'white',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  camera: {
    fontSize: 30,
  },
  transparentImg: {
    borderRadius: 75,
    width: 90,
    height: 90,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'gray'
  },
  image: {
    borderRadius: 75,
    width: 90,
    height: 90,
    borderColor: colors.primary,
    borderWidth: 1,
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
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: '#295F98'
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
    margin: 0,
  },
  transBox: {
    backgroundColor: 'gray',
    borderWidth: 0
  },
  checkbox: {
    // backgroundColor: '#FCFAEE',
    backgroundColor: 'white',
    borderWidth: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15,
    textAlign: 'center',
  }
})

