import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getVehicles, deleteVehicle } from "../controller/VehiculoController"; // Importa deleteVehicle

export default function VehicleListScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener vehículos desde Firebase
  const fetchVehicles = async () => {
    try {
      const vehicleData = await getVehicles();
      setVehicles(vehicleData); // Actualiza el estado con los vehículos obtenidos
      setLoading(false); // Cambia el estado de carga cuando los datos estén listos
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los vehículos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles(); // Cargar vehículos al montar el componente
  }, []);

  // Función para eliminar un vehículo
  const handleDelete = (vehicleId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este vehículo?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deleteVehicle(vehicleId); // Llamar al controlador de eliminación
              await fetchVehicles(); // Refrescar la lista de vehículos después de eliminar
              Alert.alert("Éxito", "Vehículo eliminado con éxito");
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar el vehículo.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Función para manejar la actualización
  const handleUpdate = (vehicle) => {
    navigation.navigate("VehicleUpdate", { vehicle }); // Navegar a la pantalla de formulario para actualizar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Vehículos</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text> // Muestra un mensaje de carga mientras se obtiene la información
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Placa:</Text>
              <Text style={styles.value}>{item.plate}</Text>

              <Text style={styles.label}>Marca:</Text>
              <Text style={styles.value}>{item.brand}</Text>

              <Text style={styles.label}>Fecha de Fabricación:</Text>
              <Text style={styles.value}>
                {item.manufactureDate?.toDate().toLocaleDateString() || "Fecha no disponible"}
              </Text>

              <Text style={styles.label}>Color:</Text>
              <Text style={styles.value}>{item.color}</Text>

              <Text style={styles.label}>Costo:</Text>
              <Text style={styles.value}>{`${item.cost} $`}</Text>

              <Text style={styles.label}>Activo:</Text>
              <Text style={styles.value}>{item.isActive ? "Sí" : "No"}</Text>

              {/* Botones de actualización y eliminación */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdate(item)} // Llamar a la función de actualización
                >
                  <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)} // Llamar a la función de eliminación
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("VehicleForm")}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
