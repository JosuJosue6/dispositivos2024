export default class Vehicle {
  constructor(id, plate, brand, manufactureDate, color, cost, isActive) {
      this.id = id || Date.now().toString(); // Genera un ID único si no se proporciona
      this.plate = plate || '';
      this.brand = brand || '';
      this.manufactureDate = manufactureDate || '';
      this.color = color || 'blanco'; // Valor predeterminado
      this.cost = cost || 0;
      this.isActive = isActive || false;
  }
}
