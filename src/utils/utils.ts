import { IsThenable, RunSafely } from "./utils.types";

/**
 * Tests whether an object is thenable.
 * 
 * @param {any} maybeThenable - Value to test.
 */
const isThenable: IsThenable = maybeThenable => Boolean(typeof maybeThenable?.then === "function");

/**
 * Invokes a supplied function and returns the result of the call on success or null if it throws. If errorHandler is supplied,
 * it is invoked on error & its result is returned instead of null.
 * 
 * @param {Function} functionToTry - A function to run.
 * @param {Array} [functionToTryArgs = []] - Optional arguments to pass to "functionToTry".
 * @param {Function} [errorHandler] - Optional callback invoked if "functionToTry" throws. The error object will always be passed to this function as the first argument.
 * @param {Array} [errorHandlerAdditionalArgs = []] - Optional additional arguments to pass to errorHandler.
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
export const runSafely: RunSafely = (
  functionToTry: Function,
  functionToTryArgs: any[] = [],
  errorHandler?: Function,
  errorHandlerAdditionalArgs: any[] = [],
) => {
  const handleErrorOrReturnNull = (typeof errorHandler === "function") ? errorHandler : () => null;
  
  let callResult: any;
  try {
    callResult = functionToTry(...functionToTryArgs);
  } catch (error) {
    return handleErrorOrReturnNull(error, ...errorHandlerAdditionalArgs);
  }
  
  // Special handling for promise-like objects
  if (isThenable(callResult)) {
    return callResult.then(
      (result: any) => result,
      (error: any) => handleErrorOrReturnNull(error, ...errorHandlerAdditionalArgs),
    );
  }
  
  return callResult;
};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */