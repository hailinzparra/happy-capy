interface CoreEventsMap { }
type CoreEventsListener<K extends keyof CoreEventsMap> = (ev: CoreEventsMap[K] & { source: any }) => any
interface CoreEvents {
    ev: { [K in keyof (CoreEventsMap & ObjectOf<any>)]?: K extends keyof CoreEventsMap ? CoreEventsListener<K>[] : (CoreEventsListener<any>)[] }
    on<K extends keyof CoreEventsMap>(name: K, listener: CoreEventsListener<K>): CoreEventsListener<K>
    on(name: string, listener: CoreEventsListener<any>): CoreEventsListener<any>
    off<K extends keyof CoreEventsMap>(name: K, listener: CoreEventsListener<K>): void
    off(name: string, listener: CoreEventsListener<any>): void
    once<K extends keyof CoreEventsMap>(name: K, listener: CoreEventsListener<K>): CoreEventsListener<K>
    once(name: string, listener: CoreEventsListener<any>): CoreEventsListener<any>
    trigger<K extends keyof CoreEventsMap>(name: K, events: CoreEventsMap[K], source?: any): void
    trigger<K extends string>(name: K, events?: K extends keyof CoreEventsMap ? CoreEventsMap[K] : any, source?: any): void
}

core.events = {
    ev: {},
    on(name: string, listener: CoreEventsListener<any>) {
        this.ev[name] = this.ev[name] || []
        this.ev[name]!.push(listener)
        return listener
    },
    off(name: string, listener: CoreEventsListener<any>) {
        const new_listeners: CoreEventsListener<any>[] = []
        const ev = this.ev[name]
        if (ev) {
            for (let i = 0; i < ev.length; i++) {
                if (ev[i] !== listener) {
                    new_listeners.push(ev[i])
                }
            }
            this.ev[name] = new_listeners
        }
    },
    once(name: string, listener: CoreEventsListener<any>) {
        const fn = (ev: any) => {
            listener.call(this, ev)
            this.off(name, fn)
        }
        return this.on(name, fn)
    },
    trigger(name: string, events: any) {
        const ev = this.ev[name]
        if (ev) {
            for (let i = 0; i < ev.length; i++) {
                ev[i].call(this, events)
            }
        }
    },
}
