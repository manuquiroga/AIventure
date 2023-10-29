export interface Character {
    id:string;
    nombre: string;
    sexo: string;
    rol: string;
    especie: string;
    cabello: string;
    musculatura: string;
    photoURL?: string | null;

    fuerza: number;
    destreza: number;
    inteligencia: number;
    carisma: number;
    coraje: number;
}