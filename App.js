import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width:SCREEN_WIDTH } = Dimensions.get("window");
//const SCREEN_WIDTH = Dimensions.get("window").width;
console.log(SCREEN_WIDTH)

export default function App() {
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>Seoul</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.weather}>
        <View style={style.day}>
          <Text style={style.temp}>27°</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27°</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27°</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27°</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container : {
    flex:1, 
    backgroundColor:"beige"
  },
  city : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  },
  cityName : {
    fontSize : 48,
    fontWeight : 500
  },
  weather : {
  
  },
  day : {
    width : SCREEN_WIDTH,
    alignItems : "center",
  },
  temp : {
    marginTop : 30,
    fontSize : 98,
  },
  description : {
    marginTop : -10,
    fontSize : 62,
  }
})
