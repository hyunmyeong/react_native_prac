import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const { width:SCREEN_WIDTH } = Dimensions.get("window");
//const SCREEN_WIDTH = Dimensions.get("window").width;

const API_KEY = "e04f0548af06e129812f553d855f169c";

export default function App() {

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeatther = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }

    const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps:false}
      );
    setCity(location[0].city);
    const response = fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={arlet}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeatther();
  },[])

  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.weather}>
        {days.length === 0 ? (
          <View style={style.day}>
            <ActivityIndicator/>
          </View>
          ) : (
          days.map((day,index) => (
            <View key={index} style={style.day}>
              <Text style={style.temp}>
                {parseFloat(day.temp.day).toFixed(1)} 
              </Text>
              <Text style={style.description}>{day.weather[0].main}</Text>
            </View>
            ))
        )}
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
