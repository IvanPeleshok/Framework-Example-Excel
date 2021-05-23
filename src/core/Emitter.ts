export class Emitter {
    listeners = {}; 

    // dispatch, fire, trigger,
    public emit(event: string, ...args) {
        if (!(this.listeners[event] instanceof Array)) return false;
        this.listeners[event].forEach(listener => listener(...args));
        return true;
    }

    // on, listen
    public subscribe(event: string, fn: any) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
        }
    }
}