export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

export type TreatmentPreference = 'Sr.' | 'Sra.' | 'Srta.' | '';
