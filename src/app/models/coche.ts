export interface Coche {
    id: number;
    placa: string;
    puertas: string;
    tipo: Tipo;
    marca: Marca;
}

export interface Tipo {
    id: number;
    nombre: string;
}

export interface Marca {
    id: number;
    nombre: string;
}
