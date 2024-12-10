import { getFirestore, doc, setDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

// Obtener la instancia de Firestore
const db = getFirestore();

// Función para agregar un nuevo vehículo
const addVehicle = async (vehicle) => {
  try {
    // Agregar vehículo a la colección "vehicles"
    await addDoc(collection(db, "vehicles"), vehicle);
    console.log("Vehículo agregado con éxito");
  } catch (error) {
    console.error("Error al agregar vehículo: ", error.message);
    throw new Error(error.message);
  }
};

// Función para actualizar un vehículo existente
const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const vehicleRef = doc(db, "vehicles", vehicleId); // Referencia al documento del vehículo
    await setDoc(vehicleRef, vehicleData); // Actualizar el vehículo
    console.log("Vehículo actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar vehículo: ", error.message);
    throw new Error(error.message);
  }
};

// Función para obtener todos los vehículos
const getVehicles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "vehicles")); // Obtener todos los vehículos de la colección
    const vehiclesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return vehiclesList; // Retorna la lista de vehículos obtenidos
  } catch (error) {
    console.error("Error al obtener los vehículos:", error.message);
    throw new Error(error.message); // Maneja el error correctamente
  }
};

// Función para eliminar un vehículo
const deleteVehicle = async (vehicleId) => {
  try {
    const vehicleRef = doc(db, "vehicles", vehicleId); // Referencia al documento del vehículo
    await deleteDoc(vehicleRef); // Eliminar el documento
    console.log("Vehículo eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar vehículo: ", error.message);
    throw new Error(error.message); // Maneja el error correctamente
  }
};

export { addVehicle, updateVehicle, getVehicles, deleteVehicle };
