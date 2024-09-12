import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Settings = (navigation: any) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.text}>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent:'center',
    alignItems:'center'
  }
})