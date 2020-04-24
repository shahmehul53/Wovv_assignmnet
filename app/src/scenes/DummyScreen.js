import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {Container, Header, Content, Button, Text} from 'native-base';
import Axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

var api_key = 'Gm0GowOLicT74YPJ2SDXZ8pir4Nylj5HAqo3yBty';

const FirstScreen = ({route, navigation}) => {
  const [data1, setData1] = useState({id: '', validation: true});
  const [datasource, setDatasource] = useState([]);
  const [response, setResponse] = useState('');
  const [validation, setValidation] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [arrData, setarrData] = useState([]);
  //let arrData = [];
  let randomItem = [];

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`,
    ).then(res => {
      console.log('REsult', res.data.near_earth_objects[0].id);
      setarrData(res.data.near_earth_objects);
      var resultarray = res.data.near_earth_objects;

      for (let i = 0; i < resultarray[i].id.length - 1; i++) {
        arrData.push(resultarray[i].id);
      }
      console.log('arrData', arrData);
      randomItem = arrData[Math.floor(Math.random() * arrData.length)];
      console.log('randomItem', randomItem);
      if (res.status == 200) {
        setDataLoaded(true);
      }
    });
  };

  const apiCall1 = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${data1.id}?api_key=${api_key}`,
    )
      .then(res => {
        console.log('REsult', res), setResponse(res.data);
        if (res.status == 200) {
          navigation.navigate('Second', {id: res.data.id});
        } else {
          alert('No ID Found');
        }
      })
      .catch(error => alert('no id found'));
  };

  useEffect(() => {
    if (arrData.length > 0) {
      setDataLoaded(true);
    }

    console.log('arrd', arrData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholderTextColor="#000"
        style={styles.textInputStyle}
        placeholder="Enter Asteroid' ID"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={id => setData1({id, validation: false})}
        // value={id}
      />
      <TouchableOpacity
        onPress={() => apiCall1()}
        // navigation.navigate('Second', {id: data1}, apiCall1())}
        disabled={data1.validation}
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
        onPress={() => apiCall()}
        // onPress={() => navigation.navigate('Second', {id: randomItem})}
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
      {dataLoaded ? (
        <View style={{marginHorizontal: 30, marginBottom: 30}}>
          <FlatList
            data={arrData}
            renderItem={({item}) => {
              console.log('item', arrData);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Second', {id: item.id})}>
                  <View style={{height: 30, marginTop: 20}}>
                    <Text style={{color: '#000'}}>{item.id}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <Text>Not loaded</Text>
      )}
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputStyle: {
    borderWidth: 1.5,
    borderColor: '#000',
    width: wp('83%'),
    height: hp('7'),

    marginHorizontal: 30,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: 'red',
    color: 'red',
    marginHorizontal: 30,

    marginTop: 30,
    marginBottom: 10,

    width: wp('80%'),
    height: hp('6.5%'),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
  },
});

<View style={styles.container}>
  <Text>SecondScreen</Text>
  <Text style={styles.title}>Name : {data.name}</Text>
  <Text style={styles.title}>URL : {data.nasa_jpl_url}</Text>
  <Text style={styles.title}>
    IS Potentialy Hazardouz or Not :{' '}
    {data.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
  </Text>
</View>;
