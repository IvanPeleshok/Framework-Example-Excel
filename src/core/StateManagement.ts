// interface IType {
//     type: string,
//     // [key: string]: any,
// }

export function createState<S>(rootReducer: (initialState: S, type) => S, initialState: S) {
    let state = rootReducer(initialState, {type: "__INIT__"});
    let listeners: Array<(state: S) => void> = [];

    return {
        subscribe: (fn: (state: S) => void) => {
            listeners.push(fn);
            return {
                unsubscribe: () => listeners.filter(listener => listener !== fn)  || []
            }
        },

        dispatch: (action) => {
            state = rootReducer(state, action);
            listeners.forEach(listener => listener(state));
        },

        getState: () => state
    }
}

// implement class
export class CreateState<S> {
    private state: S;
    private listeners = [];

    constructor(private rootReducer: (initialState: S, type) => S, initialState: S) {
        this.state = rootReducer(initialState, {type: "__INIT__"});
    }

    subscribe = (fn: (state: S) => void) => {
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