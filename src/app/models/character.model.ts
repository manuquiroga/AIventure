export interface Character {
    nombre: string;
    sexo: string;
    rol: string;
    especie: string;
    photoURL?: string | null;

    fuerza: number;
    destreza: number;
    inteligencia: number;
    carisma: number;
    coraje: number;
}