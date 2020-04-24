import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Axios from 'axios';

var api_key = 'GHK7riureaOrtm6hBOhqtDoU8vnnXmb7sKXTcq44';

const SecondScreen = ({route, navigation}) => {
  const {id} = route.params;
  console.log('id', id);
  const [data, setData] = useState('');

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`,
    ).then(res => {
      console.log('REsult', res.data.near_earth_objects), setData(res.data);
    });
  };

  useEffect(() => {
    apiCall();
  }, []);
  return (
    <View style={styles.container}>
      <Text>SecondScreen</Text>
      <Text style={styles.title}>Name : {data.name}</Text>
      <Text style={styles.title}>URL : {data.nasa_jpl_url}</Text>
      <Text style={styles.title}>
        IS Potentialy Hazardouz or Not :{' '}
        {data.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
