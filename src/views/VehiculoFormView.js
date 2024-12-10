import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Switch, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addVehicle, updateVehicle } from "../controller/VehiculoController";

export default function VehicleFormScreen({ route, navigation }) {
  const vehicle = route.params?.vehicle || {};
  const [plate, setPlate] = useState(vehicle.plate || "");
  const [brand, setBrand] = useState(vehicle.brand || "Toyota");
  const [manufactureDate, setManufactureDate] = useState(new Date(vehicle.manufactureDate || Date.now()));
  const [color, setColor] = useState(vehicle.color || "Blanco");
  const [cost, setCost] = useState(vehicle.cost || "");
  const [isActive, setIsActive] = useState(vehicle.isActive || false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    // Verificación de que todos los campos estén completos
    if (!plate || !brand || !manufactureDate || !cost) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    // Verificación de que el costo sea un valor numérico válido
    if (isNaN(parseFloat(cost)) || !cost) {
      Alert.alert("Error", "El costo debe ser un valor numérico.");
      return;
    }

    try {
      const newVehicle = {
        plate,
        brand,
        manufactureDate,
        color,
        cost: parseFloat(cost),
        isActive,
      };

      console.log("Nuevo vehículo:", newVehicle); // Verificación de los datos

      // Si el vehículo tiene un ID, actualizarlo; si no, agregarlo
      if (vehicle.id) {
        await updateVehicle(vehicle.id, newVehicle);
      } else {
        await addVehicle(newVehicle);
      }

      Alert.alert("Éxito", "El vehículo ha sido guardado correctamente.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("VehicleList", { refresh: true });
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || manufactureDate;
    setShowDatePicker(false);
    setManufactureDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Placa:</Text>
        <TextInput
          style={styles.input}
          value={plate}
          onChangeText={setPlate}
          placeholder="Ingrese la placa"
        />

        <Text style={styles.label}>Marca:</Text>
        <Picker
          selectedValue={brand}
          style={styles.picker}
          onValueChange={(itemValue) => setBrand(itemValue)}
        >
          {["Toyota", "Honda", "Mazda", "Ford"].map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>

        <Text style={styles.label}>Fecha de Fabricación:</Text>
        <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={manufactureDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.selectedDate}>
          Fecha seleccionada: {manufactureDate.toISOString().split("T")[0]}
        </Text>

        <Text style={styles.label}>Color:</Text>
        <View style={styles.colorOptions}>
          <Button
            title="Blanco"
            onPress={() => setColor("Blanco")}
            color={color === "Blanco" ? "green" : "gray"}
          />
          <Button
            title="Negro"
            onPress={() => setColor("Negro")}
            color={color === "Negro" ? "green" : "gray"}
          />
          <Button
            title="Azul"
            onPress={() => setColor("Azul")}
            color={color === "Azul" ? "green" : "gray"}
          />
        </View>

        <Text style={styles.label}>Costo:</Text>
        <TextInput
          style={styles.input}
          value={cost}
          onChangeText={(value) => setCost(value)}
          placeholder="Ingrese el costo"
          keyboardType="numeric"
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Activo:</Text>
          <Switch value={isActive} onValueChange={setIsActive} />
        </View>

        <Button title="Guardar" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDate: {
    fontSize: 14,
    marginBottom: 15,
    color: "#555",
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});
