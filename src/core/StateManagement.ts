export function createState(rootReducer: (initialState, type) => typeof initialState, initialState) {
    let state = rootReducer(initialState, {type: "__INIT___"});
    let listeners = [];
    return {
        subscribe: (fn) => {
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

    constructor(private rootReducer: (initialState, type) => typeof initialState, initialState) {
        this.state = rootReducer(initialState, {type: "__INIT__"});
    }

    subscribe = (fn) => {
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