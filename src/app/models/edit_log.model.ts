export interface EditLog {
    id: number;
    timestamp: string;       // Fecha y hora del cambio (ISO string)
    description: string;     // Descripción del cambio realizado
    userId: number;          // ID del usuario que realizó el cambio
  }
  