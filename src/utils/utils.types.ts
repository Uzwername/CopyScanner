/**
 * Copied from this package @see {@link https://github.com/Morglod/ts-tuple-hacks}
 * Unfortunately, it wasn't possible to install the package from NPM.
 */
type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

export interface IsThenable {
  (maybePromise: any): boolean
}

/**
 * Adapted from this answer @see {@link https://stackoverflow.com/a/65961301/9430588}
 */ 
export interface RunSafely {
  <F extends () => any>(fn: F): ReturnType<F> | null;
  <F extends (...functionToTryArgs: any[]) => any>(fn: F, functionToTryArgs: Parameters<F>): ReturnType<F> | null;
  <F extends () => any, H extends (error: any) => any>(fn: F, functionToTryArgs: never[] | undefined, errorHandler: H): ReturnType<F> | ReturnType<H>;
  <F extends () => any, H extends (error: any, ...errorHandlerAdditionalArgs: any[]) => any>(fn: F, functionToTryArgs: never[] | undefined, errorHandler: H, errorHandlerAdditionalArgs: Tail<Parameters<H>>): ReturnType<F> | ReturnType<H>;
  <F extends (...functionToTryArgs: any[]) => any, H extends (error: any) => any>(fn: F, functionToTryArgs: Parameters<F>, errorHandler: H): ReturnType<F> | ReturnType<H>;
  <F extends (...functionToTryArgs: any[]) => any, H extends (error: any, ...errorHandlerAdditionalArgs: any[]) => any>(fn: F, functionToTryArgs: Parameters<F>, errorHandler: H, errorHandlerAdditionalArgs: Tail<Parameters<H>>): ReturnType<F> | ReturnType<H>;
};