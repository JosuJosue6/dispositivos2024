import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase'; // Importar desde el archivo firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Importar correctamente setDoc y doc de Firestore

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el cargando

  // Expresión regular para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !password || !email) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'El correo electrónico no tiene un formato válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true); // Activar el estado de cargando

    try {
      // Crear usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nombre: firstName,
        apellido: lastName,
        correo: email,
        contrasenia: password,
      });

      // Solo se muestra la alerta si todo ha sido exitoso
      Alert.alert('Registro exitoso', `El usuario ${firstName} ${lastName} ha sido registrado.`);
      navigation.navigate('Home'); 
    } catch (error) {
      // Manejo de errores (correo ya registrado, etc.)
      console.error(error); // Imprimir el error en consola para diagnóstico
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Este correo electrónico ya está registrado.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      } else {
        Alert.alert('Error', error.message); // Mostrar alerta con el mensaje de error
      }
    } finally {
      setIsLoading(false); // Desactivar el estado de cargando
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        onChangeText={setLastName}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
