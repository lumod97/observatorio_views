import { EditLog } from "./edit_log.model";
import { Person } from "./person.model";
import { Role } from "./role.model";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;  // Si es necesario mostrar o manipular la contraseña
  active: boolean;
  roles: Role[];     // Lista de roles asociados al usuario
  person: Person;    // Relación con la entidad 'Person'
  editLogs: EditLog[];  // Lista de logs de edición relacionados con el usuario
}