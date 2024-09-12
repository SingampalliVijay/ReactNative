import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.textContainer}> Welcome To HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textContainer:{
        fontSize:30,
        color:'gray'
    }
})