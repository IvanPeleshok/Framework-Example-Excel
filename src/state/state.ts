import { createState } from "../core/StateManagement";
import { storage } from "../core/utils";
import { initialState, InitialStateT } from "./initialState";
import { rootReducer } from "./rootReducer";

export type StateT = typeof state;

const initialLocalState = 'excel-state';
export const state = createState<InitialStateT>(rootReducer, storage<InitialStateT>(initialLocalState) || initialState);
state.subscribe(state => storage('excel-state', state));