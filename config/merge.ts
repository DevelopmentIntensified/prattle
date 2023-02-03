export default merge;

/**
 * Merge an instance with another one
 * @param target Object to merge the custom values into
 * @param source Object with custom values
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
function mergeWith (target: object, source: object) : object {
  const isObject = (obj: unknown) => obj && typeof obj === "object";
  (Object.keys(source) as (keyof typeof source)[]).forEach(key => {
    const targetValue = target[key] as unknown;
    const sourceValue = source[key] as unknown;

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      (target[key] as Array<unknown>) = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      (target[key] as object) = merge(Object.assign({}, targetValue), sourceValue as object);
    } else {
      (target[key] as typeof sourceValue) = sourceValue;
    }
  });

  return target;
}

/**
 * Recursively merges the specified object instances
 * @param instances Instances to merge, from left to right
 */
function merge (...instances: object[]) : object {
  let i = instances.length - 1;
  while (i > 0) {
    instances[i - 1] = mergeWith(instances[i - 1], instances[i]);
    i--;
  }
  return instances[0];
}
