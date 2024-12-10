import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, ScrollView } from "react-native";
import { updateVehicle } from "../controller/VehiculoController";

export default function VehicleForm({ route, navigation }) {
  const { vehicle } = route.params || {}; // Recibir el vehículo desde la navegación

  // Estados para manejar los campos del formulario
  const [plate, setPlate] = useState(vehicle?.plate || "");
  const [brand, setBrand] = useState(vehicle?.brand || "");
  const [manufactureDate, setManufactureDate] = useState(
    vehicle?.manufactureDate?.toDate().toISOString().split("T")[0] || "" // Convertir fecha si existe
  );
  const [color, setColor] = useState(vehicle?.color || "");
  const [cost, setCost] = useState(vehicle?.cost?.toString() || ""); // Convertir costo a string
  const [isActive, setIsActive] = useState(vehicle?.isActive || false);

  // Manejar la actualización del vehículo
  const handleSave = async () => {
    if (!plate || !brand || !manufactureDate || !color || !cost) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      await updateVehicle(vehicle.id, {
        plate,
        brand,
        manufactureDate: new Date(manufactureDate), // Convertir la fecha a formato Date
        color,
        cost: parseFloat(cost), // Convertir el costo a número
        isActive,
      });
      Alert.alert("Éxito", "Vehículo actualizado con éxito");
      navigation.navigate("VehicleList"); // Volver a la lista
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al actualizar el vehículo.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Vehículo</Text>

      {/* Placa */}
      <Text style={styles.inputLabel}>Placa</Text>
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={plate}
        onChangeText={setPlate}
      />
      
      {/* Marca */}
      <Text style={styles.inputLabel}>Marca</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />
      
      {/* Fecha de Fabricación */}
      <Text style={styles.inputLabel}>Fecha de Fabricación</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha de Fabricación (YYYY-MM-DD)"
        value={manufactureDate}
        onChangeText={setManufactureDate}
      />
      
      {/* Color */}
      <Text style={styles.inputLabel}>Color</Text>
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      
      {/* Costo */}
      <Text style={styles.inputLabel}>Costo ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Costo ($)"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric" // Permitir solo números
      />

      {/* Estado Activo */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Activo?</Text>
        <Switch
          value={isActive}
          onValueChange={setIsActive}
        />
      </View>

      <Button title="Guardar" onPress={handleSave} color="#2196F3" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    marginTop: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
