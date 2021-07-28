import { PartTable } from "../components/table/Table";
import { InitialStateT } from "./initialState";
import * as Types from "./types";

type ActionT = Types.TInferActions<typeof actions>;

export function rootReducer(state: InitialStateT, action: ActionT): InitialStateT {
    switch (action.type) {
        case Types.TABLE_RESIZE:
            let field = (action.type as PartTable) === PartTable.Column ? 'colState' : 'rowState';
            const prevState = state.colState;
            prevState[action.payload.id] = action.payload.value;
            return {...state, [field]: prevState};
        default: return state;
    }
}

export const actions = {
    tableResize:(payload: Types.ITableResize) => ({type: Types.TABLE_RESIZE, payload} as const),
}