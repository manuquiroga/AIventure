import { Character } from './character.model';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    character1?: Character;
    character2?: Character;
    character3?: Character;
    historias?: number;
}