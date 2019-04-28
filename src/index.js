// @flow

import { useRef } from "react"

/**
 * This hook makes a proxy for a function.
 * It guarantees to return the same instance across multiple renders. It calls nothing if actual handler is nullish.
 * @param f Some recreatable function to wrap.
 * @returns function.
 */
export function useHandler<Func: Function>(f: ?Func): Func {
	const ref = useRef(f)
	ref.current = f
	const proxy = useRef(function(...args) {
		return ref.current == null ? undefined : ref.current.apply(this, args)
	})
	return (proxy.current: any)
}
