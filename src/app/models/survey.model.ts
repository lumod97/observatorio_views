import { Question } from "./question.model";
import { User } from "./user.model";

export interface Survey {
  id: number;
  name: string;
  createdAt: Date;               // Campo correspondiente a 'createdAt' en Java
  createdBy: Number;               // Relación con 'User' (sería un objeto 'User' en lugar de un ID)
  isEnabled: boolean;
  questions:[{id:number, text: string}]
}