import {StyleSheet, Pressable,SafeAreaView,View ,Text,TextInput} from 'react-native';
import { Link, Stack } from "expo-router";
import React, {useEffect,useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import movimientos from './movimientos'
import tranferencia from './tranferencia'
import { Button } from '@react-navigation/elements';



import {
  createStaticNavigation,
  useNavigation,
  useRoute
} from '@react-navigation/native';



export default function NotFoundScreen( ) {
  console.log("Movimientos")
  const route = useRoute();
  const [userId] = useState(String(route.params.userId));
  console.log (userId)
  
  const [monto,onChangeText] = React.useState('');
  
 
  const navigation = useNavigation();
  const getMovimientos = async () => {
    try {
      console.log("Movimientos")
      const response = await fetch(
        'http://192.168.1.71:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: 'maria@gmail.com',
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  const generateQR = async () => {
    
    try {
      let json={
        opcion:"2",
        email:userId,
        operacion:"+",
        monto:monto
      }
      navigation.navigate('codeqr', {
        monto: json
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      
      <View >
      <Text style={styles.title}>Cobro</Text>
      <Text style={styles.title}>Ingrese monto</Text>
      <TextInput style={styles.buttonStyle} value={monto} keyboardType="numeric" onChangeText={onChangeText}/>

      
          <Button onPress={() => generateQR()}>
       Cobrar
      </Button>
        
      </View>
    </SafeAreaView>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    
  },
  title: {
    color: "#0E7AFE",
    fontSize: 30,
  },
  buttonStyle: {
    color: "#0E7AFE",
    backgroundColor: "black",
    fontSize: 20,
    textAlign: "center",
    marginTop:20,
    opacity: 0.1 
    
  },
});