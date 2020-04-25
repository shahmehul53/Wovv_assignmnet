import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Text,
  Grid,
  Row,
  Col,
  Body,
  Card,
  CardItem,
} from 'native-base';

import Axios from 'axios';

var api_key = 'Gm0GowOLicT74YPJ2SDXZ8pir4Nylj5HAqo3yBty';

const SecondScreen = ({route, navigation}) => {
  const {id} = route.params;
  console.log('id', id);
  const [data, setData] = useState('');

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`,
    ).then(res => {
      console.log('REsult', res.data), setData(res.data);
    });
  };

  useEffect(() => {
    apiCall();
  }, []);
  return (
    <Container style={{flex: 1, margin: 10}}>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.title}>name : {data.name}</Text>
              <Text style={styles.title}>
                nasa_jpl_url : {data.nasa_jpl_url}
              </Text>
              <Text style={styles.title}>
                is_potentially_hazardous_asteroid :{' '}
                {data.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
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
    paddingVertical: 10,
    textAlign: 'center',
  },
});
