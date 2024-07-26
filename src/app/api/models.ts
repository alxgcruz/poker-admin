export interface Country {
    name?: string;
    code?: string;
}

export interface IPlayer {
    id?: string;
    codigo?: string;
    nombre?: string;
    apPaterno?: string;
    apMaterno?: string;
    correo?: string;
    telefono?: string;
    fecNacimiento?: string;
    isActive?: boolean;
    fecCreacion?: string;
    image?: string;
    comentarios?: string;
}

export interface IUser {
    id?: string;
    codigo?: string;
    nombre?: string;
    apPaterno?: string;
    apMaterno?: string;
    correo?: string;
    telefono?: string;
    fecNacimiento?: string;
    isActive?: boolean;
    fecCreacion?: string;
    image?: string;
    comentarios?: string;
}

export interface ITable {
    id?: string;
    nombre?: string;
    isActive?: boolean;
    fecCreacion?: string;
}

export interface IRoom {
    id?: string;
    nombre?: string;
    isActive?: boolean;
    fecCreacion?: string;
}

export interface ICasino {
    id?: string;
    nombre?: string;
    isActive?: boolean;
    fecCreacion?: string;
}

export interface IMode {
    id?: string;
    nombre?: string;
    minEntrada?: number;
    maxEntrada?: number;
    isActive?: boolean;
    fecCreacion?: string;
}

export interface IBuyIn {
    id?: string;
    codigo?: string;
    nombre?: string;
    image?: string;
    totalEntradas?: number;
    totalSalidas?: number;
}

export interface ICasinoInResp {
    casinos: ICasinoIn[];
    totalVentas: number;
}

export interface ICasinoIn {
    id?: string;
    casino?: string;
    totalEntradas?: number;
    totalSalidas?: number;
    porcentaje?: number
}

export interface IMovimientosResp {
    movimientos: IMov[];
    totalMovimientos: number;
}

export interface IMov {
    id?: string;
    desc?: string;
    user?: string;
    player?: string;
    fecMov?: string;
    tipo?: string;
    icono?: string;
}

export interface ITablePlaying {
    mesa?: ITable;
    horaInicio?: string;
    jugadores?: number;
    entrada?: number;
    total?: number;
    isPlaying?: boolean;
}