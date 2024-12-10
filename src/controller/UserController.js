import User from "../models/User";

const users = [];

// Genera un ID único
const generateId = () => {
  return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
};

// Agrega un usuario al listado
export const addUser = (userData) => {
  const { nombre, contrasenia } = userData;

  // Validación básica
  if (!nombre || !contrasenia) {
    throw new Error("El nombre y la contraseña son obligatorios.");
  }

  // Verificar si el nombre ya existe
  const existingUser = users.find((user) => user.nombre === nombre);
  if (existingUser) {
    throw new Error("El usuario ya existe.");
  }

  const newUser = new User(generateId(), nombre, contrasenia);
  users.push(newUser);
  return newUser;
};

// Obtiene la lista de usuarios
export const getUsers = () => users;

// Busca un usuario por nombre
export const findUserByName = (nombre) => {
  return users.find((user) => user.nombre === nombre) || null;
};

// Verifica credenciales de usuario
export const verifyUserCredentials = (nombre, contrasenia) => {
  const user = findUserByName(nombre);
  if (!user) {
    return false; // Usuario no encontrado
  }
  return user.contrasenia === contrasenia;
};