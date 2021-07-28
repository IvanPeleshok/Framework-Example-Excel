import { IColState } from "./types";

export const initialState = {
    colState: {} as IColState,
}

export type InitialStateT = typeof initialState;