import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Para navegar
import { signOut } from 'firebase/auth'; // Si usas Firebase, esto es un ejemplo
import { auth } from '../firebase'; // Asegúrate de configurar tu autenticación

export default function HomePage({ navigation }) {
  
  // Función para cerrar sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Cierra la sesión de Firebase
      navigation.reset({
        index: 0, // Esto indica que la nueva pantalla será la principal
        routes: [{ name: "Login" }], // Reemplaza "Login" con el nombre de tu pantalla de inicio de sesión
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>¡Bienvenido a HomePage!</Text>
        <Image
          source={require('../assets/image.png')} 
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.introText}>
          Explora las funciones de nuestra aplicación y disfruta de una experiencia increíble.
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => navigation.navigate("VehicleList")}
        >
          <Text style={styles.buttonText}>Ir a Vehículos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blueButton]}
          onPress={() => navigation.navigate("VehicleForm")}
        >
          <Text style={styles.buttonText}>Agregar Vehículo</Text>
        </TouchableOpacity>
        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          style={[styles.button, styles.redButton]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Team 2(JJNA). Todos los derechos reservados.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 15,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#ddd",
    borderWidth: 2,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  introText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
    lineHeight: 22,
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  greenButton: {
    backgroundColor: "#4CAF50",
  },
  blueButton: {
    backgroundColor: "#2196F3",
  },
  redButton: {
    backgroundColor: "#f44336", // Color rojo para el botón de cerrar sesión
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
});
