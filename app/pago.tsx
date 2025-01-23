import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

import { useCameraPermissions } from "expo-camera";
import { useRoute } from '@react-navigation/native';
import React, {useEffect,useState} from 'react';

export default function Home() {
  const route = useRoute();
  const [labelText ] = useState(String(route.params.email));
  console.log(labelText)
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Pagar</Text>
      <View style={{ gap: 20 }}>
      <Pressable onPress={requestPermission}>
          <Text style={styles.buttonStyle}>Dar permisos</Text>
        </Pressable>
        <Link href={{ pathname: '/scanner', params: { miusuario: labelText } }} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Escaner
            </Text>
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
  title: {
    color: "#0E7AFE",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
});