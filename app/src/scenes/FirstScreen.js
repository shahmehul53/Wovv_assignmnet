import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Footer,
  Input,
  Item,
  List,
  ListItem,
  Text,
} from 'native-base';
import Axios from 'axios';

var api_key = 'Gm0GowOLicT74YPJ2SDXZ8pir4Nylj5HAqo3yBty';

const FirstScreen = ({route, navigation}) => {
  const [data1, setData1] = useState({id: '', validation: true});
  const [response, setResponse] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [arrData, setarrData] = useState([]);
  let randomItem = [];

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`,
    ).then(res => {
      // console.log('REsult', res.data.near_earth_objects[0].id);
      setarrData(res.data.near_earth_objects);
      var resultarray = res.data.near_earth_objects;

      for (let i = 0; i < resultarray[i].id.length - 1; i++) {
        arrData.push(resultarray[i].id);
      }
      // console.log('arrData', arrData);
      randomItem = arrData[Math.floor(Math.random() * arrData.length)];
      // console.log('randomItem', randomItem);
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
        // console.log('REsult', res), setResponse(res.data);
        if (res.status == 200) {
          navigation.navigate('Second', {id: res.data.id});
        } else {
          alert('No ID Found');
        }
      })
      .catch(error => alert('No Such ID'));
  };

  useEffect(() => {
    if (arrData.length > 0) {
      setDataLoaded(true);
    }

    // console.log('arrd', arrData);
  }, []);

  return (
    <Container style={{margin: 20}}>
      <Content padder>
        <Item padder>
          <Input
            placeholder="Enter Asteroid' ID"
            style={{margin: 10}}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={id => setData1({id, validation: false})}
          />
        </Item>
        <Button
          padder
          onPress={() => apiCall1()}
          disabled={data1.validation}
          style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>SUBMIT</Text>
        </Button>
        <Button
          padder
          onPress={() => apiCall()}
          style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Random Asteroid
          </Text>
        </Button>

        <List
          dataArray={arrData}
          style={{backgroundColor: '#fff'}}
          renderRow={item => (
            <ListItem
              button
              selected
              onPress={() => navigation.navigate('Second', {id: item.id})}>
              <Text style={{padding: 10}}>{item.id}</Text>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  );
};

export default FirstScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   textInputStyle: {
//     borderWidth: 1.5,
//     borderColor: '#000',
//     width: wp('83%'),
//     height: hp('7'),

//     marginHorizontal: 30,
//     paddingHorizontal: 10,
//   },
//   buttonStyle: {
//     backgroundColor: 'red',
//     color: 'red',
//     marginHorizontal: 30,

//     marginTop: 30,
//     marginBottom: 10,

//     width: wp('80%'),
//     height: hp('6.5%'),
//     alignItems: 'center',
//     justifyContent: 'center',

//     borderRadius: 8,
//   },
// });
