import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

var api_key = 'GHK7riureaOrtm6hBOhqtDoU8vnnXmb7sKXTcq44';

const FirstScreen = ({route, navigation}) => {
  const [data, setData] = useState({id: ''});
  //const [result, setresult] = useState([]);
  let arrData = [];

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=GHK7riureaOrtm6hBOhqtDoU8vnnXmb7sKXTcq44`,
    ).then(res => {
      console.log('REsult', res.data.near_earth_objects);
      var resultarray = res.data.near_earth_objects;
      for (let i = 0; i < resultarray.length - 1; i++) {
        arrData.push(resultarray[i]);
      }
    });
  };

  var randomItem = arrData[Math.floor(Math.random() * arrData.length)];

  useEffect(() => {
    apiCall();
    console.log('arra', randomItem);
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#000"
        style={styles.textInputStyle}
        placeholder="Enter Asteroid' ID"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={id => setData(id)}
        // value={id}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Second', {id: data})}
        style={styles.buttonStyle}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            fontStyle: 'normal',
            color: '#000',
          }}>
          Submit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Second', {id: randomItem})}
        style={styles.buttonStyle}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            fontStyle: 'normal',
            color: '#000',
          }}>
          Random Asteroid
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    borderWidth: 1.5,
    borderColor: '#000',
    width: wp('83%'),
    height: hp('7'),
    //margin: 5,
    //marginTop: 10,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    //paddingVertical: 10,
  },
  buttonStyle: {
    backgroundColor: 'red',
    color: 'red',
    marginHorizontal: 30,
    //marginVertical: 10,
    marginTop: 30,
    marginBottom: 10,
    //addingHorizontal: 10,
    //marginRight:30,
    //marginLeft: 30,
    width: wp('80%'),
    height: hp('6.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    //textAlign:'center',
    borderRadius: 8,
    // padding: 15,
    //fontSize:20
  },
});
