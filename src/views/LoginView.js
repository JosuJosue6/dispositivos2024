import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  const handleLogin = async () => {
    if (!email || !contrasenia) {
      Alert.alert("Error", "Por favor ingresa ambos campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, contrasenia);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { nombre, apellido } = userDoc.data();
        Alert.alert("Inicio de sesión exitoso", `Bienvenido, ${nombre} ${apellido}!`);
      } else {
        Alert.alert("Error", "No se encontraron datos de usuario.");
      }

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Correo o contraseña incorrectos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Gestión de Usuarios</Text>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry
          onChangeText={setContrasenia}
          value={contrasenia}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  secondaryButtonText: {
    color: "#555",
    fontSize: 16,
  },
});
