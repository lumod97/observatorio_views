import { Permission } from "./permission.model";

export interface Role {
  id: number;
  name: string;
  description?: string;  // Este campo es opcional porque puede ser nulo
  permissions: Permission[];  // Relación con la entidad Permission
}