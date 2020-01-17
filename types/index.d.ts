declare module 'react-use-handler' {
    export function useHandler<
      T extends any[],
      R,
      F = (...args: T) => R
    >(func: F): F;
}