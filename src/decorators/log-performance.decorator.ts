export function LogPerformance(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const context = target.constructor.name + ':' + propertyKey;

  descriptor.value = function (...args: any[]) {
    const beginMs = performance.now();

    const result = originalMethod.apply(this, args);

    console.log(
      `[${context}] Params: ${args[0].toFixed(3)}, Executed: ${JSON.stringify(
        result,
      )} (${(performance.now() - beginMs).toFixed(3)} ms)`,
    );

    return result;
  };

  return descriptor;
}
