export interface Person {
    id: number;
    dni: string;              // El DNI es único y obligatorio
    firstName: string;       // El primer nombre es obligatorio
    lastName: string;        // El apellido es obligatorio
    birthDate?: string;      // Fecha de nacimiento, opcional
    phoneNumber?: string;    // Número de teléfono, opcional
    address?: string;        // Dirección, opcional
  }
  