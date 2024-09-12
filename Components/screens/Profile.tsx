import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
];

const bloodgroup = [
  { label: 'AB+', value: '1' },
  { label: 'AB-', value: '2' },
  { label: 'O+', value: '3' },
  { label: 'O-', value: '4' },
  { label: 'A+', value: '5' },
];
const Profile = () => {

  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.viewContainer}>
        <Text style={styles.textContainer}> First name & Last name</Text>
        <TextInput style={styles.inputField} />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.halfContainer}>
            <Text style={styles.textContainer}>Relative</Text>
            <TextInput style={styles.halfinputField} />
          </View>
          <View style={styles.halfContainer}>
            <Text style={styles.textContainer}>Gender</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
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
        </View>
        <Text style={styles.textContainer}>Date of birth</Text>
        <View style={styles.dateOfBirthContainer}>
          <TextInput
            style={[styles.dob, { flex: 1 }]}
            placeholder='yyyy/mm/dd'
          />
          <Icon name='calendar-outline' style={styles.icon} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.halfContainer}>
            <Text style={styles.textContainer}>Height (cm)</Text>
            <TextInput style={styles.halfinputField} />
          </View>
          <View style={styles.halfContainer}>
            <Text style={styles.textContainer}>Weight (kg)</Text>
            <TextInput style={styles.halfinputField} />
          </View>
        </View>
        <Text style={styles.textContainer}> Blood Group</Text>
        <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
              placeholderStyle={styles.placeholderStyle}
              // selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={bloodgroup}
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
        <TouchableOpacity style={styles.profile}>
          <Text style={{ fontSize: 20, color: 'white' }}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D7C66',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20
  },
  viewContainer: {
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 20,
    width: '90%',
    backgroundColor: 'white'
  },
  textContainer: {
    fontSize: 13,
    color: '#222831',
    margin: 10
  },
  inputField: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    width: '94%',
    margin: 10,
    marginTop: 1,
  },
  halfContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  halfinputField: {
    borderWidth: 2,
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
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 5,
  },
  icon: {
    fontSize: 20,
    color: '#333',
    padding: 10,
  },
  profile: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    margin: 15,
    marginTop: 30,
    backgroundColor: '#0D7C66'
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})