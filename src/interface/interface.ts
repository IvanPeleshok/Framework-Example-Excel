import { Formula } from "../components/formula/Formula";
import { Header } from "../components/header/Header";
import { Table } from "../components/table/Table";
import { Toolbar } from "../components/toolbar/Toolbar";
import { Emitter } from "../core/Emitter";
import { StateT } from "../state/state";

export interface IOptions<S = StateT> {
    listeners?: Array<string>;
    name?: string;
    components?: Array<TComponent>;
    emitter?: Emitter;
    state?: S;
}

export type TComponent = typeof Header | typeof Toolbar | typeof Formula | typeof Table;
export type TComponents = (Header | Toolbar | Formula | Table)[];

// export interface IDom { 
//     $el: HTMLElement;

//     html: (HTML: string) => void;
//     clear: () => IDom;
//     on: (eventType: string, callback: () => void) => void;
//     off: (eventType: string, callback: () => void) => void;
//     append: (node: IDom | HTMLElement & Node) => IDom;
// }

// export interface IExcelComponent { 
//     name: string;
    
//     toHTML: () => string;
//     init: () => void;
//     destroy: () => void;
// }

// export interface IComponent {}

// export interface IExcel {
//     selector: string,
//     options: IOptions
// }
