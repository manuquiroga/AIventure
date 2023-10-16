import { Character } from './character.model';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    character1?: Character | null;
    character2?: Character | null;
    character3?: Character | null;
    historias?: number;
}