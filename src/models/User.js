export default class User {
  constructor(id, nombre,correo, contrasenia) {
    this.id = id; // Identificador único
    this.nombre = nombre; // Nombre del usuario
    this.correo = correo; // Correo
    this.contrasenia = contrasenia; // Contraseña (en texto plano o encriptada)
  }
}
