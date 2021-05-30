// interface IType {
//     type: string,
//     // [key: string]: any,
// }

export function createState<S>(rootReducer: (initialState: S, type) => S, initialState: S) {
    let state = rootReducer(initialState, {type: "__INIT__"} as any);
    let listeners = [];

    return {
        subscribe: (fn: () => void) => {
            listeners.push(fn);
            return {
                unsubscribe: () => listeners.filter(listener => listener !== fn) 
            }
        },

        dispatch: (action) => {
            state = rootReducer(state, action);
            listeners.forEach(listener => listener(state));
        },

        getState: () => state
    }
}

export class CreateState {
    private state;
    private listeners = [];

    constructor(private rootReducer, initialState) {
        this.state = rootReducer(initialState, {type: "__INIT__"});
    }

    subscribe = (fn: (...args) => void) => {
        this.listeners.push(fn);
        return {
            unsubscribe: () => this.listeners.filter(listener => listener !== fn)
        }
    }

    dispatch = (action) => {
        this.state = this.rootReducer(this.state, action);
        this.listeners.forEach(listener => listener(this.state));
    }

    getState = () => this.state;
}