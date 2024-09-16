type EventHandler = (...args: any[]) => void;

const subscribers: Map<string, EventHandler[]> = new Map<
  string,
  EventHandler[]
>();

/**
 * Register new event.
 *
 * @param eventName
 */
export function register(eventName: string): void {
  if (!subscribers.has(eventName)) {
    subscribers.set(eventName, []);
  }
}

/**
 * Subscribe handler to event by name.
 *
 * @param eventName
 * @param handler
 */
export function subscribe(eventName: string, handler: EventHandler): void {
  register(eventName);
  subscribers.get(eventName)?.push(handler);
}

/**
 * Dispatch event by name.
 *
 * @param eventName
 * @param args
 */
export function dispatch(eventName: string, ...args: any[]): boolean {
  if (!subscribers.has(eventName)) {
    return false;
  }

  subscribers.get(eventName)?.forEach((handler: EventHandler) => {
    handler(...args);
  });

  return true;
}

/**
 * Subscribe decorator.
 *
 * @param eventName
 * @constructor
 */
export function Subscribe(eventName: string) {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const func = descriptor.value;
    subscribe(eventName, func);
    return descriptor;
  };
}
