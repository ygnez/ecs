export namespace EventBus {
  const subscribers: Map<string, Function[]> = new Map<string, Function[]>();

  function register(eventName: string): void {
    if (!subscribers.has(eventName)) {
      subscribers.set(eventName, []);
    }
  }

  export function subscribe(eventName: string, handler: Function): void {
    register(eventName);
    subscribers.get(eventName)?.push(handler);
  }

  export function dispatch(eventName: string, ...args: any[]): boolean {
    if (!subscribers.has(eventName)) {
      return false;
    }

    subscribers.get(eventName)?.forEach((handler: Function) => {
      handler(...args);
    });

    return true;
  }
}

export function dispatch(eventName: string, ...args: any[]): boolean {
  return EventBus.dispatch(eventName, ...args);
}

export function Subscribe(eventName: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const func = descriptor.value;
    EventBus.subscribe(eventName, func);
    return descriptor;
  };
}
