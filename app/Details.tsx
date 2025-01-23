import {StyleSheet ,View,SafeAreaView,Text,Pressable} from 'react-native';
import { Link, Stack } from "expo-router";
import React, {useEffect,useState} from 'react';
import {

  useNavigation,
  useRoute
} from '@react-navigation/native';

export default function NotFoundScreen( ) {
  console.log("Movimientos")
  const route = useRoute();

  

  const [labelText ] = useState(String(route.params.email));
  const [labelSaldo] = useState(String(route.params.saldo));
  
 
  const navigation = useNavigation();
  const getMovimientos = async () => {
    
    try {
      console.log("extra")
      const response = await fetch(
        'http://192.168.1.71:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: labelText,
        }),
      });
      const json = await response.json();
      console.log("saldo"+json)
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovimientos()

  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.buttonStyle}>Saldo Actual :{labelSaldo}</Text>
      <View style={{ gap: 20 }}>
        <Link href={{ pathname: '/cobro', params: { userId: labelText } }} asChild>
          <Pressable>
          <Text style={styles.buttonStyle} >Cobro</Text>
          </Pressable>
        </Link>
        <Link href={{ pathname: '/pago', params: { email: labelText } }} asChild>
          <Pressable>
            <Text style={styles.buttonStyle} >Pago</Text>
          </Pressable>
        </Link>
                <Link href={{ pathname: '/movimientos', params: { email: labelText } }} asChild>
          <Pressable>
            <Text style={styles.buttonStyle} >Movimientos</Text>
          </Pressable>
        </Link>
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
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
  titleContainer: {
    alignItems: "center",
    color:"#0E7AFE",
    fontSize: 20,
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 0,
  },
  title: {
    color: "#0E7AFE",
    fontSize: 40,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
