import { SafeAreaView, StyleSheet, Text ,Pressable,View,TextInput} from 'react-native';
import { Link, Stack } from "expo-router";
import React, {useEffect} from 'react';
import { Button } from '@react-navigation/elements';


import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';


export default function HomeScreen() {
  const [text,setText] = React.useState('');
  const [contraseña,setContraseña] = React.useState('');
  const navigation = useNavigation();
  const getMoviesFromApiAsync = async () => {
    try {
     
     console.log('Input Value:', text);
     console.log('Input  :', contraseña);
     console.log("entrod")
      const response = await fetch(
        'http://192.168.1.71:3000/menu', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: text,
        }),
      });
      const json = await response.json();
      navigation.navigate('Details', {
        email: text,
        saldo:json.message
      });
      console.log(json)
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Bienvenido </Text>
      <View style={{ gap: 10 }}>
        <TextInput
        placeholder="Correo"
        onChangeText={(text) => setText(text)}
        value={text}
        />
        <TextInput
        placeholder="contraseña"
        secureTextEntry={true}
        onChangeText={(contraseña) => setContraseña(contraseña)}
        value={contraseña}
        />
       <Button onPress={() => getMoviesFromApiAsync()}>
       ingresar
      </Button>
      <Button onPress={() => navigation.navigate('alta')}>
       Crear usuario
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
    paddingVertical: 80,
  },
  title: {
    color: "#0E7AFE",
    fontSize: 40,
  },
  buttonStyle: {
    color: "red",
    backgroundColor: "black",
    fontSize: 20,
    textAlign: "center",
    marginTop:20,
    
  },
});
