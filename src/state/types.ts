export const TABLE_RESIZE = 'TABLE_RESIZE';

export type TInferActions<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never;

export interface IColState {[keys: string]: number};

export interface ITableResize {
    value: number;
    type: string;
    id: string;
}