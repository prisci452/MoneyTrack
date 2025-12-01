import { Hobby } from "./Hobby";

export interface User {
    nombre_completo: string,
    genero: string,
    pasatiempos: Hobby[],
    iddepartamento: number,
    usuario: string,
    password: string
} 
