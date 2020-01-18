declare module "react-use-handler" {
	export function useHandler<T extends unknown[], R, F = (...args: T) => R>(func: F): F
}
