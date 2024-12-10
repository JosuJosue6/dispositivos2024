import { initializeApp, getApp, getApps } from "firebase/app"; 
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase (obtén estas claves desde la consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyB-c-EGbcgmr6EBJm8qfXhwZfU2w88XcpA",
  authDomain: "applogindm.firebaseapp.com",
  projectId: "applogindm",
  storageBucket: "applogindm.appspot.com", // Corregido de .app a .com
  messagingSenderId: "918395488997",
  appId: "1:918395488997:web:4af49e83ff4fc715bce20c",
  measurementId: "G-WQR9DMTXFW"
};

// Inicializar Firebase si no se ha inicializado antes
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Función para registrar al usuario y guardar su información en Firestore
const registerUser = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    console.log("Usuario registrado con éxito y datos guardados en Firestore");
    return user; // Devuelve el usuario registrado
  } catch (error) {
    console.error("Error al registrar usuario: ", error.message);
    throw new Error(error.message);
  }
};

// Función para agregar un nuevo vehículo
const addVehicle = async (vehicle) => {
  try {
    await addDoc(collection(db, "vehicles"), vehicle); // Agregar el vehículo
    console.log("Vehículo agregado con éxito");
  } catch (error) {
    console.error("Error al agregar vehículo: ", error.message);
    throw new Error(error.message);
  }
};

// Función para actualizar un vehículo existente
const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const vehicleRef = doc(db, "vehicles", vehicleId);
    await setDoc(vehicleRef, vehicleData); // Actualizar el vehículo
    console.log("Vehículo actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar vehículo: ", error.message);
    throw new Error(error.message);
  }
};

// Función para obtener todos los vehículos
const getAllVehicles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "vehicles"));
    const vehiclesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return vehiclesList; // Retorna la lista de vehículos
  } catch (error) {
    console.error("Error al obtener todos los vehículos: ", error.message);
    throw new Error(error.message);
  }
};

// Función para eliminar un vehículo
const deleteVehicle = async (vehicleId) => {
  try {
    const vehicleRef = doc(db, "vehicles", vehicleId);
    await deleteDoc(vehicleRef); // Eliminar el documento
    console.log("Vehículo eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar vehículo: ", error.message);
    throw new Error(error.message);
  }
};

export { db, auth, registerUser, addVehicle, updateVehicle, getAllVehicles, deleteVehicle };
